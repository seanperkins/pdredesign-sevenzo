# == Schema Information
#
# Table name: analyses
#
#  id           :integer          not null, primary key
#  name         :text
#  deadline     :datetime
#  inventory_id :integer
#  created_at   :datetime
#  updated_at   :datetime
#  message      :text
#

class Analysis < ActiveRecord::Base
  include Authority::Abilities
  self.authorizer_name = 'AnalysisAuthorizer'

  belongs_to :inventory

  attr_accessor :assign

  validates_presence_of :name, :deadline, :inventory
	validates :message, presence: true, if: "assigned_at.present?"

  has_many :members, class_name:'AnalysisMember'
  has_many :participants, -> { where(role: 'participant') }, class_name:'AnalysisMember'
  has_many :facilitators, -> { where(role: 'facilitator') }, class_name:'AnalysisMember'

  after_create :set_members_from_inventory
  before_save :set_assigned_at

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
end
