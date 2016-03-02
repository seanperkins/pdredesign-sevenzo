FactoryGirl.define do
  factory :inventory_participant do
    association :user
    association :inventory
  end
end
