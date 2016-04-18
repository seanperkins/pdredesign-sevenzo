FactoryGirl.define do
  factory :analysis do
    name { Faker::Lorem.word }
    deadline { Faker::Date.between(1.day.from_now, 1.year.from_now) }
    association :inventory
  end
end
