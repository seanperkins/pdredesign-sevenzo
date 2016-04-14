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
    email { Faker::Internet.email }

    trait :as_facilitator do
      role 'facilitator'
    end

    trait :as_participant do
      role 'participant'
    end
  end
end
