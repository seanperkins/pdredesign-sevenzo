# == Schema Information
#
# Table name: messages
#
#  id            :integer          not null, primary key
#  content       :text
#  category      :string(255)
#  sent_at       :datetime
#  assessment_id :integer
#  created_at    :datetime
#  updated_at    :datetime
#  mandrill_id   :string(255)
#  mandrill_html :text
#

FactoryGirl.define do
  factory :message
end
