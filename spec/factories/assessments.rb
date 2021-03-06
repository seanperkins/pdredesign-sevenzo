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

    trait :with_response do
      assigned_at Time.now
      association :response, :as_assessment_responder
    end

    trait :with_owner do
      association :user, factory: [:user, :with_district], districts: 1
    end

    trait :with_participants do
      transient do
        invited false
      end
      name 'Assessment other'
      message 'some message'
      association :user, factory: [:user, :with_district], districts: 1

      after(:build) do |assessment, evaluator|
        assessment.participants = create_list(:participant, 2, :with_users,
                                              invited_at: (1.day.ago if evaluator.invited)
        )
        assessment.facilitators = create_list(:user, 1, :with_district)
      end
    end

    trait :with_network_partners do
      name 'Assessment other'
      message 'some message'
      association :user, factory: [:user, :with_district], districts: 1

      before(:create) do |assessment|
        assessment.network_partners = create_list(:user, 1, :with_network_partner_role, :with_district)
      end
    end

    trait :with_consensus do
      after(:create) do |assessment|
        assessment.update_attributes(response: create(:response, responder: assessment))
      end
    end
  end
end
