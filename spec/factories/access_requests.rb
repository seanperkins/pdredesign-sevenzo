# == Schema Information
#
# Table name: access_requests
#
#  id         :integer          not null, primary key
#  tool_id    :integer
#  user_id    :integer
#  roles      :string           default([]), is an Array
#  created_at :datetime
#  updated_at :datetime
#  token      :string
#  tool_type  :string
#

require 'securerandom'

FactoryGirl.define do
  factory :access_request do
    association :user, :with_district
    association :tool, factory: [:assessment, :with_participants]

    roles { [:facilitator] }
    token { SecureRandom.hex[0..9] }

    trait :with_participant_role do
      roles { [:participant] }
    end

    trait :with_facilitator_role do
      roles { [:facilitator] }
    end

    trait :with_both_roles do
      roles { [:participant, :facilitator] }
    end

    trait :for_assessment do
      association :tool, factory: [:assessment, :with_participants, :with_facilitators]
    end

    trait :for_inventory do
      association :tool, factory: [:inventory, :with_participants, :with_facilitators]
    end

    trait :for_analysis do
      association :tool, factory: [:analysis, :with_participants, :with_facilitators]
    end
  end
end
