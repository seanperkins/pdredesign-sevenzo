# == Schema Information
#
# Table name: inventory_responses
#
#  id                  :integer          not null, primary key
#  inventory_member_id :integer
#  submitted_at        :datetime         not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class InventoryResponse < ActiveRecord::Base
  validates_presence_of :submitted_at
  belongs_to :inventory_member, dependent: :delete
end
