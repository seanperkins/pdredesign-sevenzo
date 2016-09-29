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
  include MessageMigrationConcern
  include MembershipConcern
  include ToolOwnerMembershipConcern

  belongs_to :inventory
  belongs_to :rubric
  belongs_to :owner, class_name: 'User'

  has_one :response, as: :responder, dependent: :destroy
  has_many :messages, as: :tool
  has_many :tool_members, as: :tool
  has_many :access_requests, as: :tool
  has_many :participants, -> { where(tool_type: 'Analysis',
                                     role: ToolMember.member_roles[:participant])
  }, foreign_key: :tool_id, class_name: 'ToolMember'

  has_many :facilitators, -> { where(tool_type: 'Analysis',
                                     role: ToolMember.member_roles[:facilitator])
  }, foreign_key: :tool_id, class_name: 'ToolMember'

  attr_accessor :assign

  #Exposed alias for testing
  alias_attribute :due_date, :deadline
  alias_attribute :user, :owner

  delegate :district, to: :inventory, prefix: false

  validates_presence_of :name, :deadline, :inventory, :rubric, :owner
  validates :message, presence: true, if: "assigned_at.present?"

  after_create :set_members_from_inventory,
               :add_facilitator_owner

  before_save :set_assigned_at,
              :ensure_share_token

  after_save :synchronize_members_with_parent

  def team_roles_for_participants
    self.tool_members
        .includes(:user)
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

  private
  def add_facilitator_owner
    self.facilitators.create(user: owner) if owner
  end

  def set_members_from_inventory
    %i|participants facilitators|.each do |member_type|
      self.inventory.send(member_type).each do |inventory_member|
        self.send(member_type).create(user: inventory_member.user) unless self.owner == inventory_member.user
      end
    end
  end

  def set_assigned_at
    self.assigned_at = Time.now if self.assign
  end

  def ensure_share_token
    self.share_token ||= SecureRandom.hex(32)
  end

  def synchronize_members_with_parent
    ToolMember.where(tool: self).each {|tool_member|
      self.inventory.tool_members.create(tool: self.inventory,
                                         role: ToolMember.member_roles[:participant],
                                         user_id: tool_member.user_id)
    }
  end
end
