# == Schema Information
#
# Table name: priorities
#
#  id         :integer          not null, primary key
#  tool_id    :integer
#  order      :integer          is an Array
#  created_at :datetime
#  updated_at :datetime
#  tool_type  :string
#

FactoryGirl.define do
  factory :priority

  trait :as_assessment_ordering do
    tool_type 'Assessment'
  end

  trait :as_analysis_ordering do
    tool_type 'Analysis'
  end
end
