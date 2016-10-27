# == Schema Information
#
# Table name: assessments
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  due_date        :datetime
#  meeting_date    :datetime
#  user_id         :integer
#  rubric_id       :integer
#  created_at      :datetime
#  updated_at      :datetime
#  district_id     :integer
#  message         :text
#  assigned_at     :datetime
#  report_takeaway :text
#  share_token     :string
#

FactoryGirl.define do
  factory :assessment do
    name { Faker::Lorem.word }
    association :rubric
    association :district
    due_date 5.days.from_now
    association :user, factory: [:user, :with_district], districts: 1

    trait :with_response do
      assigned_at Time.now
      association :response, :as_assessment_responder
    end

    trait :with_message do
      message { Faker::Lorem.paragraph }
    end

    trait :with_facilitators do
      transient do
        facilitators 1
      end

      after(:create) do |assessment, evaluator|
        create_list(:tool_member, evaluator.facilitators, :as_facilitator, tool: assessment)
      end
    end

    trait :with_participants do
      transient do
        participants 1
        invited false
      end

      after(:build) do |assessment, evaluator|
        assessment.participants = create_list(:tool_member,
                                              evaluator.participants,
                                              :as_participant,
                                              tool: assessment,
                                              invited_at: (1.day.ago if evaluator.invited))
      end
    end

    trait :with_consensus do
      after(:create) do |assessment|
        assessment.update_attributes(response: create(:response, responder: assessment))
      end
    end

    trait :with_network_partners do
      after(:create) do |assessment|
        assessment.facilitators = create_list(:tool_member, 1, :as_facilitator, :with_network_partner_role, tool: assessment)
      end
    end
  end
end
