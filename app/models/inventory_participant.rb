# == Schema Information
#
# Table name: inventory_participants
#
#  id           :integer          not null, primary key
#  inventory_id :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#  invited_at   :datetime
#

class InventoryParticipant < ActiveRecord::Base
  belongs_to :user
  belongs_to :inventory

  validates_presence_of :user
  validates_presence_of :inventory
end
