# == Schema Information
#
# Table name: rubrics
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  version    :decimal(, )
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#  enabled    :boolean
#

FactoryGirl.define do
  factory :rubric do
    name { Faker::Internet.name }
    sequence(:version)
    enabled true
  end
end
