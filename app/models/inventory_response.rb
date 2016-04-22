# == Schema Information
#
# Table name: inventory_responses
#
#  id                  :integer          not null, primary key
#  inventory_member_id :integer          not null
#  submitted_at        :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class InventoryResponse < ActiveRecord::Base
  belongs_to :inventory_member

  after_save :increment_parent_inventory
  before_destroy :decrement_parent_inventory

  private
  def increment_parent_inventory
    if self.submitted_at.present?
      inventory = inventory_member.inventory
      inventory.increment(:total_participant_responses, 1)
      inventory.save!
    end
  end

  def decrement_parent_inventory
    if self.submitted_at.present?
      inventory = inventory_member.inventory
      inventory.decrement(:total_participant_responses, 1)
      inventory.save!
    end
  end
end
