FactoryGirl.define do
  factory :assessment do
    name { Faker::Lorem.word }
    association :rubric
    association :district

    trait :with_participants do
      name 'Assessment other'
      due_date Time.now
      message 'some message'
      association :rubric
      association :district
      association :user, factory: [:user, :with_district], districts: 1

      before(:create) do |assessment|
        assessment.participants = FactoryGirl.create_list(:participant, 2, :with_users)
        assessment.facilitators = [FactoryGirl.create(:user, :with_district)]
      end
    end
  end
end
