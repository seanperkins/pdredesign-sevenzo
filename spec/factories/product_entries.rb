# == Schema Information
#
# Table name: product_entries
#
#  id                            :integer          not null, primary key
#  general_inventory_question_id :integer          not null
#  product_question_id           :integer
#  usage_question_id             :integer          not null
#  technical_question_id         :integer          not null
#  created_at                    :datetime
#  updated_at                    :datetime
#  inventory_id                  :integer
#

FactoryGirl.define do
  factory :product_entry do
    association :general_inventory_question
    association :usage_question
    association :technical_question
  end
end
