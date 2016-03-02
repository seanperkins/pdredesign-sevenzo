# == Schema Information
#
# Table name: inventory_participants
#
#  id           :integer          not null, primary key
#  inventory_id :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#  invited_at   :datetime
#

FactoryGirl.define do
  factory :inventory_participant do
    association :user
    association :inventory
  end
end
