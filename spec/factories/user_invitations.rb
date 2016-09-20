# == Schema Information
#
# Table name: user_invitations
#
#  id            :integer          not null, primary key
#  first_name    :string(255)
#  last_name     :string(255)
#  email         :string(255)
#  team_role     :string(255)
#  token         :string(255)
#  assessment_id :integer
#  user_id       :integer
#

FactoryGirl.define do
  factory :user_invitation do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    team_role { Faker::Commerce.department }
    role { Faker::Commerce.department }
    sequence :email do |n|
      "testuser#{n}@example.com"
    end
    association :assessment, :with_participants
    association :user, :with_district

    trait :as_facilitator do
      role 'facilitator'
    end

    trait :as_participant do
      role 'participant'
    end

    trait :without_default_user do
      user nil
    end

    trait :with_matching_user_email do
      after(:create) do |user_invitation|
        user_invitation.email = user_invitation.user.email
      end
    end

    trait :with_associated_assessment_participant do
      after(:create) do |user_invitation|
        create(:participant, user: user_invitation.user, assessment: user_invitation.assessment)
      end
    end
  end
end
