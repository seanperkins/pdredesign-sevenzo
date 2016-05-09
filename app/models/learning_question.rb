# == Schema Information
#
# Table name: learning_questions
#
#  id         :integer          not null, primary key
#  tool_id    :integer
#  user_id    :integer
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tool_type  :string
#

class LearningQuestion < ActiveRecord::Base

  belongs_to :tool, polymorphic: true
  belongs_to :user

  validates_length_of :body, maximum: 255
  validates_presence_of :body
  validates_presence_of :tool
  validates_presence_of :user
end
