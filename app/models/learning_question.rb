class LearningQuestion < ActiveRecord::Base

  self.primary_keys = [:assessment_id, :user_id]

  belongs_to :assessment
  belongs_to :user

  validates_length_of :body, maximum: 255
  validates_presence_of :body

end