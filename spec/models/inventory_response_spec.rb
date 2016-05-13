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

require 'spec_helper'

describe InventoryResponse do
  it { is_expected.to belong_to(:inventory_member) }
end