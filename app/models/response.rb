# == Schema Information
#
# Table name: responses
#
#  id                   :integer          not null, primary key
#  responder_id         :integer
#  responder_type       :string(255)
#  rubric_id            :integer
#  submitted_at         :datetime
#  created_at           :datetime
#  updated_at           :datetime
#  notification_sent_at :datetime
#

class Response < ActiveRecord::Base
	belongs_to :responder, polymorphic: true
	belongs_to :rubric
	has_many :scores, dependent: :destroy
	has_many :feedbacks, dependent: :destroy
	accepts_nested_attributes_for :scores
	accepts_nested_attributes_for :feedbacks
  
  before_save { |response| response.responder.update_column(:meeting_date, Time.now) if response.responder_type == 'Assessment' }
	
  after_save do |response|
		if response.responder_type == 'Participant' && response.submitted_at.present?
      response.responder.assessment.cache_consensus_object
		end
	end

	def form_object
		object = {}

    self.rubric.questions.group_by{ |q| q.category }.each do |category, questions|
      object[category] = {}
      object[category][:ids] = questions.collect(&:id)
      object[category][:questions] = []

      questions.each do |question|
        qobj = {}
        qobj[question] = {}
        qobj[question][:answers] = question.answers
        qobj[question][:score] = self.scores.where(question_id: question.id).first
        object[category][:questions].push(qobj)
      end
    end

		return object
	end

  def report_object
    object = {}

    self.rubric.questions.group_by{ |q| q.category }.each do |category, questions|
      object[category] = {}
      scores = self.scores.where(question_id: questions.collect(&:id)).pluck(:value).reject(&:nil?)

      object[category][:score] = scores.empty? ? 0.0 : DescriptiveStatistics::Stats.new(scores).mean.round(2)
      object[category][:diagnostic_min] = 2.0
    end

    return object
  end

  def axis_object
    object = {}

    self.rubric.questions.group_by{ |q| q.category.axis }.each do |axis, questions|
      object[axis] = {}
      object[axis][:ids] = questions.collect(&:id)
      object[axis][:questions] = []

      scores = self.scores.where(question_id: questions.collect(&:id)).pluck(:value).reject(&:nil?)
      object[axis][:average] = scores.empty? ? 0.0 : DescriptiveStatistics::Stats.new(scores).mean.round(2)

      questions.each do |question|
        qobj = {}
        qobj[question] = {}
        qobj[question][:score] = self.scores.where(question_id: question.id).first
        object[axis][:questions].push(qobj)
      end
    end

    return object
  end

	def completed?
		return self.submitted_at.present?
	end

	def percent_completed
		return (self.scores.where("value IS NOT NULL AND evidence IS NOT NULL").count.to_d/self.rubric.questions.count.to_d)*100
	end

end
