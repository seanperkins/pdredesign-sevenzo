# == Schema Information
#
# Table name: inventory_responses
#
#  id                  :integer          not null, primary key
#  inventory_member_id :integer
#  submitted_at        :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class InventoryResponse < ActiveRecord::Base
  belongs_to :inventory_member, dependent: :delete
end
