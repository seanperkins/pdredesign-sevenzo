# == Schema Information
#
# Table name: data_entries
#
#  id           :integer          not null, primary key
#  created_at   :datetime
#  updated_at   :datetime
#  inventory_id :integer
#  name         :text
#  deleted_at   :datetime
#

FactoryGirl.define do
  factory :data_entry do
    name { Faker::Lorem.word }
    association :general_data_question
    association :data_entry_question
    association :data_access_question
  end
end
