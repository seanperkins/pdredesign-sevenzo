# == Schema Information
#
# Table name: access_requests
#
#  id            :integer          not null, primary key
#  assessment_id :integer
#  user_id       :integer
#  roles         :string           default([]), is an Array
#  created_at    :datetime
#  updated_at    :datetime
#  token         :string(255)
#

require 'securerandom'

FactoryGirl.define do
  factory :access_request do
    association :user, :with_district
    association :assessment, :with_participants

    roles { [:facilitator] }
    token { SecureRandom.hex[0..9] }

    trait :with_participant_role do
      roles { [:participant] }
    end
  end
end
