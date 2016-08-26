# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  content    :text
#  category   :string(255)
#  sent_at    :datetime
#  tool_id    :integer
#  created_at :datetime
#  updated_at :datetime
#  tool_type  :string
#

FactoryGirl.define do
  factory :message
end
