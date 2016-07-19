# == Schema Information
#
# Table name: axes
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#

FactoryGirl.define do
  factory :axis do
    name { Faker::Lorem.word }
  end
end
