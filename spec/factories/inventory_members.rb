# == Schema Information
#
# Table name: inventory_members
#
#  id           :integer          not null, primary key
#  inventory_id :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#  invited_at   :datetime
#  role         :string
#

FactoryGirl.define do
  factory :inventory_members do
    association :user
    association :inventory
  end
end
