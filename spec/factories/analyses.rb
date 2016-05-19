# == Schema Information
#
# Table name: analyses
#
#  id             :integer          not null, primary key
#  name           :text
#  deadline       :datetime
#  inventory_id   :integer
#  created_at     :datetime
#  updated_at     :datetime
#  message        :text
#  assigned_at    :datetime
#  rubric_id      :integer
#  owner_id       :integer
#  report_takeway :text
#

FactoryGirl.define do
  factory :analysis do
    name { Faker::Lorem.word }
    deadline { Faker::Date.between(1.day.from_now, 1.year.from_now) }
    association :inventory
    association :rubric
    association :owner, factory: :user
  end
end
