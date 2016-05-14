# == Schema Information
#
# Table name: analysis_access_requests
#
#  id          :integer          not null, primary key
#  analysis_id :integer          not null
#  user_id     :integer          not null
#  role        :string           not null
#  token       :string
#  created_at  :datetime
#  updated_at  :datetime
#

FactoryGirl.define do
  factory :analysis_access_request do
    association :analysis
    association :user

    trait :as_facilitator do
      role 'facilitator'
    end

    trait :as_participant do
      role 'participant'
    end
  end
end
