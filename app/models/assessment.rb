# == Schema Information
#
# Table name: assessments
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  due_date        :datetime
#  meeting_date    :datetime
#  user_id         :integer
#  rubric_id       :integer
#  created_at      :datetime
#  updated_at      :datetime
#  district_id     :integer
#  message         :text
#  assigned_at     :datetime
#  mandrill_id     :string(255)
#  mandrill_html   :text
#  report_takeaway :text
#

class Assessment < ActiveRecord::Base
  include Authority::Abilities
  self.authorizer_name = 'AssessmentAuthorizer'

  default_scope { order("created_at DESC") }

	belongs_to :user
	belongs_to :rubric
	belongs_to :district
	has_one :response, as: :responder, dependent: :destroy
	has_many :participants, dependent: :destroy
	has_many :messages, dependent: :destroy
	has_many :categories, through: :questions

	has_many :users, through: :participants
	accepts_nested_attributes_for :participants, allow_destroy: true

	attr_accessor :add_participants

	## VALIDATIONS
	validates :name, presence: true
	validates :rubric_id, presence: true
	validates :district_id, presence: true
	validates :due_date, presence: true, if: "assigned_at.present?"
	validates :message, presence: true, if: "assigned_at.present?"

	validate :validate_participants, if: "assigned_at.present?"

	def validate_participants
    return unless self.participants.empty?
		errors.add :participant_ids, "You must assign participants to this assessment." 
	end
	
	## ASSESSMENT METHODS FOR RESPONSES
  def status
    return :draft if assigned_at.nil?  
    return :consensus if response.present?
    :assessment
  end

	def completed?
		percent_completed == 100
	end

	def assigned?
    assigned_at.present?
  end

  def has_response?
    response.present?
  end

  def response_submitted?
    response.submitted_at.present?
  end

	def percent_completed
    participant_responses.count.to_d/participants.count.to_d*100
	end

	def score_count(question_id, value)
		Score.where(value: value, question_id: question_id, response_id: self.participant_responses.pluck(:id)).count
	end

	def modal_score(question_id)
		begin;DescriptiveStatistics::Stats.new(Score.where(question_id: question_id, response_id: self.participant_responses.pluck(:id)).pluck(:value)).mode;rescue;end
	end

	def variance(question_id)
		begin;DescriptiveStatistics::Stats.new(Score.where(question_id: question_id, response_id: self.participant_responses.pluck(:id)).pluck(:value)).variance;rescue;end
	end

	def consensus_score(question_id)
		self.response.present? ? Score.where(question_id: question_id, response_id: self.response.id).first.value : nil
	end

  def responses(user)
    participant = participants.find_by(user: user) 
    return [] unless participant
    [participant.response].compact
  end

	## methods for participants
  #TODO: extract
	def participant_responses
      all_participant_responses
      .where.not(submitted_at: nil)
	end

	def participants_not_responded
    participants
      .joins('LEFT JOIN responses ON responses.responder_id = participants.id')
      .where('responses.submitted_at IS NULL')
  end

	def participants_viewed_report
    participants.includes(:user)
      .where.not(report_viewed_at: nil)
	end

	def all_participant_responses
		Response.where(responder_type: 'Participant', 
		               responder: participants)
  end

	## This object is used for the consensus response as well as the individual show page
	## It is stored in memcache so that it can be served up quicker than now
	## It is also updated/created every time that a participant submits (or updates a submitted) response

	def consensus_object
		Rails.cache.fetch("assessment_#{self.id}_consensus_object") do
			self.create_consensus_object
		end
	end

	def create_consensus_object
		object = {}
		
		self.rubric.questions.each do |question|
      object[question.id] = {}
      object[question.id][:mode] = self.modal_score(question.id)
      object[question.id][:variance] = self.variance(question.id)
      
      object[question.id][:scores] = []
      Score.where(question_id: question.id, response_id: self.participant_responses.pluck(:id)).where("evidence IS NOT NULL").each do |score|
        tscore = {}
        tscore[:score] = score
        tscore[:user] = score.response.responder.user

        object[question.id][:scores].push(tscore)
      end

      object[question.id][:counts] = {}
      question.answers.each do |answer|
        object[question.id][:counts][answer.value] = self.score_count(question.id, answer.value)
      end
    end

    return object		
	end

	def cache_consensus_object
		cob = self.create_consensus_object
		Rails.cache.write("assessment_#{self.id}_consensus_object", cob)
	end
	handle_asynchronously :cache_consensus_object

	
	## These methods calculate (in real time) the strengths & limitations of the district per the assessments results
	## TODO: Store these in the cache so that the page doesn't take so long to load

	def scores_by_category
		unless self.participant_responses.empty?
			ranked_by_category = {}
			category_ids = self.rubric.questions.pluck(:category_id).uniq
			response_ids = self.participant_responses.pluck(:id)

			category_ids.each do |category_id|
				scores = DescriptiveStatistics::Stats.new(Score.includes(:question).where(response_id: response_ids, questions: {category_id: category_id}).where("value > ?", 0).pluck(:value))
				ranked_by_category[Category.find(category_id)] = scores.mean unless scores.empty?
			end

			return ranked_by_category.sort_by{ |k, v| v }.reverse
		end
	end

	def consensus_by_category
		if self.response.present? && self.response.submitted_at.present?
			ranked_by_category = {}
			category_ids = self.rubric.questions.pluck(:category_id).uniq

			category_ids.each do |category_id|
				scores = DescriptiveStatistics::Stats.new(Score.includes(:question).where(response_id: self.response.id, questions: {category_id: category_id}).where("value > ?", 0).pluck(:value))
				ranked_by_category[Category.find(category_id)] = scores.mean unless scores.empty?
			end

			return ranked_by_category.sort_by{ |k, v| v }.reverse
		end
	end
	
	## Store Message HTML
	## This grabs the message content from Mandrill using the API
	## and stores it in the DB if the content exists, otherwise it runs again in ten minutes
	## this will continue until we are able to grab the data from Mandrill every ten minutes
	def store_message_html
		if self.mandrill_html.nil?
    	mandrill = Mandrill::API.new(ENV['MANDRILL_APIKEY'])
    	mandrill_response = mandrill.messages.content(self.mandrill_id)
    	self.update_column(:mandrill_html, mandrill_response['html']) if mandrill_response.present?
    end
  rescue
  	self.store_message_html
	end
	handle_asynchronously :store_message_html, run_at: Proc.new { 10.minutes.from_now }
	
	## METHOD TO GET ALL CONSENSUS RESPONSES FOR PARTICULAR USER
	def consensus_responses
		self
		  .includes(:response)
		  .where("responses.responder_type = 'Assessment' AND responses.submitted_at IS NOT NULL")
		  .references(:responses)
	end

	## CLASS METHODS!

	def self.consensus_responses
		Assessment
	    .includes(:response)
	    .where("responses.responder_type = 'Assessment' AND responses.submitted_at IS NOT NULL")
	    .references(:responses)
	end

  def self.assessments_for_user(user)
    if user.role.to_sym == :member  
      assessments_for_member(user)
    else
      assessments_for_facilitator(user)
    end
  end

  def self.assessments_for_facilitator(user)
    districts = user.district_ids
    includes(participants: :user).where(district_id: districts)
  end

  def self.assessments_for_member(user)
    assessments = user.participants.select(:assessment_id)
    includes(participants: :user).where(id: assessments)
  end
end
