# == Schema Information
#
# Table name: scores
#
#  id          :integer          not null, primary key
#  value       :integer
#  evidence    :text
#  response_id :integer
#  question_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#

FactoryGirl.define do
  factory :score

  trait :with_supporting_inventory_response do
    association :supporting_inventory_response
  end
end