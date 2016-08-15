# == Schema Information
#
# Table name: analyses
#
#  id              :integer          not null, primary key
#  name            :text
#  deadline        :datetime
#  inventory_id    :integer
#  created_at      :datetime
#  updated_at      :datetime
#  message         :text
#  assigned_at     :datetime
#  rubric_id       :integer
#  owner_id        :integer
#  report_takeaway :text
#  share_token     :string
#

FactoryGirl.define do
  factory :analysis do
    name { Faker::Lorem.word }
    deadline { Faker::Date.between(1.day.from_now, 1.year.from_now) }
    association :inventory
    association :rubric
    association :owner, factory: :user
  end

  trait :with_participants do
    transient do
      participants 1
    end

    after(:create) do |analysis, evaluator|
      create_list(:analysis_member, evaluator.participants, :as_participant, analysis: analysis)
    end
  end
end
