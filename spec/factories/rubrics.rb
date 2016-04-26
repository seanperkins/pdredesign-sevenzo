# == Schema Information
#
# Table name: rubrics
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  version    :decimal(, )
#  created_at :datetime
#  updated_at :datetime
#  enabled    :boolean
#  tool_type  :string
#

FactoryGirl.define do
  factory :rubric do
    name { Faker::Internet.name }
    sequence(:version)
    enabled true

    trait :as_assessment_rubric do
      tool_type Assessment.to_s
    end

    trait :as_analysis_rubric do
      tool_type Analysis.to_s
    end
  end
end
