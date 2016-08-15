# == Schema Information
#
# Table name: answers
#
#  id          :integer          not null, primary key
#  value       :integer
#  content     :text
#  question_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#

FactoryGirl.define do
  factory :answer
end
