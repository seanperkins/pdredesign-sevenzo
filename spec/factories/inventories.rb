# == Schema Information
#
# Table name: inventories
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  deadline    :datetime         not null
#  district_id :integer          not null
#  owner_id    :integer
#

FactoryGirl.define do
  factory :inventory do
    name { Faker::Lorem.word }
    deadline { Faker::Date.between(2.days.ago, Date.today) }
    association :district
    association :owner, factory: :user

    trait :with_members do
      transient do
        members 1
      end

      after(:create) do |inventory, evaluator|
        inventory.members = FactoryGirl.create_list(:inventory_member, evaluator.members)
      end
    end

    trait :with_facilitators do
      transient do
        facilitators 1
      end

      after(:create) do |inventory, evaluator|
        inventory.members = FactoryGirl.create_list(:inventory_member, evaluator.facilitators, :as_facilitator)
      end
    end

    trait :with_participants do
      transient do
        participants 1
      end

      after(:create) do |inventory, evaluator|
        inventory.members = FactoryGirl.create_list(:inventory_member, evaluator.participants, :as_participant)
      end
    end
  end
end
