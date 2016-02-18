FactoryGirl.define do
  factory :assessment do
    name { Faker::Internet.name }
  end
end
