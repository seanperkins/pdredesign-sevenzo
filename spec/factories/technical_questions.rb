# == Schema Information
#
# Table name: technical_questions
#
#  id               :integer          not null, primary key
#  platforms        :text             default([]), is an Array
#  hosting          :text
#  connectivity     :integer          default([]), is an Array
#  single_sign_on   :text
#  created_at       :datetime
#  updated_at       :datetime
#  product_entry_id :integer
#  deleted_at       :datetime
#

FactoryGirl.define do
  factory :technical_question
end
