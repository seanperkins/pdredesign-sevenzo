# == Schema Information
#
# Table name: learning_questions
#
#  id         :integer          not null, primary key
#  tool_id    :integer
#  user_id    :integer
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tool_type  :string
#

FactoryGirl.define do
  factory :learning_question do
    body { Faker::Hacker.say_something_smart }

    association :user
    trait :with_assessment do
      association :tool, factory: :assessment
    end

    trait :with_inventory do
      association :tool, factory: :inventory
    end

  end
end
