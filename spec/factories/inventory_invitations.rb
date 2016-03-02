# == Schema Information
#
# Table name: inventory_invitations
#
#  id           :integer          not null, primary key
#  first_name   :string
#  last_name    :string
#  email        :string
#  team_role    :string
#  role         :string
#  token        :string
#  inventory_id :integer          not null
#  user_id      :integer
#


FactoryGirl.define do
  factory :inventory_invitation do
    association :inventory
  end
end
