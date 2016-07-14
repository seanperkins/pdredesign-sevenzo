# == Schema Information
#
# Table name: analyses
#
#  id              :integer          not null, primary key
#  name            :text
#  deadline        :datetime
#  inventory_id    :integer
#  created_at      :datetime
#  updated_at      :datetime
#  message         :text
#  assigned_at     :datetime
#  rubric_id       :integer
#  owner_id        :integer
#  report_takeaway :text
#  share_token     :string
#

class Analysis < ActiveRecord::Base
  include Authority::Abilities
  self.authorizer_name = 'AnalysisAuthorizer'

  belongs_to :inventory
  belongs_to :rubric
  belongs_to :owner, class_name: 'User'

  attr_accessor :assign

  validates_presence_of :name, :deadline, :inventory, :rubric, :owner
  validates :message, presence: true, if: "assigned_at.present?"
  has_many :messages, as: :tool

  has_many :members, class_name: 'AnalysisMember'
  has_many :participants, -> { where(role: 'participant') }, class_name: 'AnalysisMember'
  has_many :facilitators, -> { where(role: 'facilitator') }, class_name: 'AnalysisMember'
  has_many :access_requests, class_name: 'AnalysisAccessRequest'
  has_one :response, as: :responder, dependent: :destroy

  after_create :set_members_from_inventory
  before_save :set_assigned_at, :ensure_share_token

  def facilitator?(user)
    return false if user.nil?
    facilitators.exists?(user_id: user.id) || owner.id == user.id
  end

  def participant?(user)
    return false if user.nil?
    participants.exists?(user_id: user.id)
  end

  def member?(user:)
    return false if user.nil?
    self.members.where(user: user).exists?
  end

  def team_roles_for_participants
    self.members
        .joins(:user)
        .pluck('users.team_role')
        .uniq
        .compact
  end

  def status
    return :draft if self.assigned_at.nil?
    :consensus
  end

  def fully_complete?
    response && response.completed?
  end

  def consensus
    @consensus ||= Response.where(responder_id: self.id, responder_type: 'Analysis').first
  end

  def pending_requests?(user)
    return false if user.nil?
    access_requests.exists?(user: user)
  end

  def network_partner?(user)
    return false if user.nil?
    self.members.joins(:user).exists?(user_id: user.id, users: {role: 'network_partner'})
  end

  private
  def set_members_from_inventory
    %i|participants facilitators|.each do |member_type|
      self.inventory.send(member_type).each do |inventory_member|
        self.send(member_type).create(user: inventory_member.user)
      end
    end
  end

  def set_assigned_at
    self.assigned_at = Time.now if self.assign
  end

  def ensure_share_token
    self.share_token ||= SecureRandom.hex(32)
  end
end
