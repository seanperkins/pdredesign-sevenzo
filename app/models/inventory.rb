# == Schema Information
#
# Table name: inventories
#
#  id          :integer          not null, primary key
#  name        :text             not null
#  deadline    :datetime         not null
#  district_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  owner_id    :integer
#  message     :text
#  assigned_at :datetime
#  share_token :string
#

class Inventory < ActiveRecord::Base
  include Authority::Abilities
  include MessageMigrationConcern

  default_scope { order(created_at: :desc) }

  has_many :product_entries
  has_many :data_entries
  has_many :access_requests, class_name: 'InventoryAccessRequest'
  has_many :messages, as: :tool

  belongs_to :district
  belongs_to :owner, class_name: 'User'

  has_many :analyses
  before_save :ensure_share_token

  self.authorizer_name = 'InventoryAuthorizer'

  # Exposed alias for testing
  alias_attribute :user, :owner
  alias_attribute :due_date, :deadline

  validates_length_of :name, minimum: 1, maximum: 255
  validates_presence_of :owner
  validates_presence_of :deadline
  validates_presence_of :message, if: 'assigned_at.present?'

  validates :deadline, date: true

  accepts_nested_attributes_for :product_entries
  accepts_nested_attributes_for :data_entries

  has_many :members, class_name: 'InventoryMember'
  has_many :participants, -> { where(role: 'participant') }, class_name: 'InventoryMember'
  has_many :facilitators, -> { where(role: 'facilitator') }, class_name: 'InventoryMember'

  attr_accessor :assign

  before_save :set_assigned_at
  after_create :add_facilitator_owner

  def facilitator?(user:)
    facilitators.where(user: user).exists?
  end

  def participant?(user:)
    participants.where(user: user).exists?
  end

  def owner?(user:)
    self.owner_id == user.id
  end

  def member?(user:)
    self.members.where(user: user).exists?
  end

  def network_partner?(user)
    self.members.joins(:user).where(user_id: user.id, users: {role: 'network_partner'}).exists?
  end

  def status
    return :draft if self.assigned_at.nil?
    :inventory
  end

  def participant_count
    participants.count
  end

  def current_analysis
    analyses.last
  end

  def pending_requests?(user)
    access_requests.where(user: user).present?
  end

  private
  def add_facilitator_owner
    return unless owner
    facilitators.create(user: owner)
  end

  def set_assigned_at
    self.assigned_at = Time.now if self.assign
  end
  
  def ensure_share_token
    self.share_token ||= SecureRandom.hex(32)
  end
end
