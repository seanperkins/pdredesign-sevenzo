# == Schema Information
#
# Table name: tool_members
#
#  tool_type   :string
#  tool_id     :integer
#  role        :integer
#  user_id     :integer          not null
#  invited_at  :datetime
#  reminded_at :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  response_id :integer
#  id          :integer          not null, primary key
#  roles       :integer          default([]), is an Array
#

FactoryGirl.define do
  factory :tool_member do
    association :user

    trait :as_analysis_member do
      association :tool, factory: :analysis
    end

    trait :as_inventory_member do
      association :tool, factory: :inventory
    end

    trait :as_assessment_member do
      association :tool, factory: :assessment
    end

    trait :as_facilitator do
      roles [ToolMember.member_roles[:facilitator]]
    end

    trait :as_participant do
      roles [ToolMember.member_roles[:participant]]
    end

    trait :as_facilitator_and_participant do
      roles [ToolMember.member_roles[:facilitator], ToolMember.member_roles[:participant]]
    end

    trait :with_network_partner_role do
      association :user, factory: [:user, :with_network_partner_role, :with_district]
    end
  end
end
