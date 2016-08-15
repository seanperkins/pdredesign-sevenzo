# == Schema Information
#
# Table name: priorities
#
#  id         :integer          not null, primary key
#  tool_id    :integer
#  order      :integer          is an Array
#  created_at :datetime
#  updated_at :datetime
#  tool_type  :string
#

FactoryGirl.define do
  factory :priority
end
