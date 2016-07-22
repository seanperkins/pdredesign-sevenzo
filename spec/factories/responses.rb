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

    trait :as_assessment_responder do
      responder_type 'Assessment'
      responder { create(:user) }
    end

    trait :as_participant_responder do
      responder_type 'Participant'
      responder { create(:participant) }
    end

    trait :as_assessment_response do
      association :rubric, :as_assessment_rubric
      after(:create) do |response, _|
        response.responder = create(:assessment, :with_participants, response: response)
      end
    end

    trait :as_analysis_response do
      association :rubric, :as_analysis_rubric
      after(:create) do |response, _|
        response.responder = create(:analysis)
      end
    end

    trait :as_participant_response do
      responder_type 'Participant'
      association :rubric, :as_assessment_rubric
      after(:create) do |response, _|
        response.responder = create(:participant)
      end
    end

    trait :submitted do
      submitted_at Time.now
    end

  end
end
