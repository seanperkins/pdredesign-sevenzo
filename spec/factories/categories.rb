# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  axis_id    :integer
#

FactoryGirl.define do
  factory :category do
    name { Faker::Hacker.ingverb }
  end
end