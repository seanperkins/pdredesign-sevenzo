# == Schema Information
#
# Table name: feedbacks
#
#  id          :integer          not null, primary key
#  content     :text
#  url         :string(255)
#  user_id     :integer
#  rubric_id   :integer
#  response_id :integer
#  question_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#

class Feedback < ActiveRecord::Base
	belongs_to :user
	belongs_to :rubric
	belongs_to :response
	belongs_to :question
end
