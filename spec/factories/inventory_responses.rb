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

FactoryGirl.define do
  factory :inventory_response do
    association :inventory_member
  end
end