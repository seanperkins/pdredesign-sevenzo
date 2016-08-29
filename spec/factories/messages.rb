# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  content    :text
#  category   :string(255)
#  sent_at    :datetime
#  tool_id    :integer
#  created_at :datetime
#  updated_at :datetime
#  tool_type  :string
#

FactoryGirl.define do
  factory :message do
    category Faker::Lorem.word
    content Faker::Lorem.sentence(10)

    trait :as_analysis_message do
      association :tool, factory: [:analysis, :with_participants]
    end

    trait :as_assessment_message do
      association :tool, factory: [:assessment, :with_participants]
    end

    trait :as_inventory_message do
      association :tool, factory: [:inventory, :with_participants]
    end
  end
end
