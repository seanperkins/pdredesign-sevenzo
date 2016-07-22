# == Schema Information
#
# Table name: user_invitations
#
#  id            :integer          not null, primary key
#  first_name    :string
#  last_name     :string
#  email         :string
#  team_role     :string
#  token         :string
#  assessment_id :integer
#  user_id       :integer
#

FactoryGirl.define do
  factory :user_invitation do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    team_role { Faker::Commerce.department }
    role { Faker::Commerce.department }
    email { Faker::Internet.email }
    association :assessment
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
  end
end
