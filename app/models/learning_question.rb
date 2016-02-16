# == Schema Information
#
# Table name: learning_questions
#
#  assessment_id :integer          primary key
#  user_id       :integer          primary key
#  body          :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class LearningQuestion < ActiveRecord::Base

  self.primary_keys = [:assessment_id, :user_id]

  belongs_to :assessment
  belongs_to :user

  validates_length_of :body, maximum: 255
  validates_presence_of :body

end
