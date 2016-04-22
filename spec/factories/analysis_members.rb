# == Schema Information
#
# Table name: analysis_members
#
#  id           :integer          not null, primary key
#  analysis_id  :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#  invited_at   :datetime
#  role         :string
#

FactoryGirl.define do
  factory :analysis_member do
    association :user
    association :analysis

    trait :as_facilitator do
      role 'facilitator'
    end

    trait :as_participant do
      role 'participant'
    end
  end
end
