# == Schema Information
#
# Table name: inventory_members
#
#  id           :integer          not null, primary key
#  inventory_id :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#  invited_at   :datetime
#  role         :string
#  reminded_at  :datetime
#

class InventoryMember < ActiveRecord::Base
  belongs_to :user
  belongs_to :inventory

  has_one :inventory_response

  validates_presence_of :user
  validates_presence_of :inventory
end
