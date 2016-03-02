# == Schema Information
#
# Table name: data_entries
#
#  id                       :integer          not null, primary key
#  general_data_question_id :integer          not null
#  data_entry_question_id   :integer          not null
#  data_access_question_id  :integer          not null
#  created_at               :datetime
#  updated_at               :datetime
#  inventory_id             :integer
#

FactoryGirl.define do
  factory :data_entry do
    association :general_data_question
    association :data_entry_question, :yearly_frequency
    association :data_access_question
  end
end
