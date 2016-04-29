# == Schema Information
#
# Table name: responses
#
#  id                   :integer          not null, primary key
#  responder_id         :integer
#  responder_type       :string(255)
#  rubric_id            :integer
#  submitted_at         :datetime
#  created_at           :datetime
#  updated_at           :datetime
#  notification_sent_at :datetime
#

FactoryGirl.define do
  factory :response do
    association :rubric

    trait :as_assessment_response do
      association :rubric, :as_assessment_rubric
      after(:create) do |response, _|
        response.responder = create(:assessment)
      end
    end

    trait :as_analysis_response do
      association :rubric, :as_analysis_rubric
      after(:create) do |response, _|
        response.responder = create(:analysis)
      end
    end
  end
end
