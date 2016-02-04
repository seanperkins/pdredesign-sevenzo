FactoryGirl.define do
  factory :user do
    email { Faker::Internet.safe_email }
    password { Faker::Internet.password(12) }
    role  :district_member
    admin false
    first_name 'Example'
    last_name 'User'
  end

  trait :sample_user do
    after(:create) do |user|
      user.role = :district_member
      user.districts << FactoryGirl.create(:district)
    end
  end
end
