# == Schema Information
#
# Table name: questions
#
#  id          :integer          not null, primary key
#  headline    :string(255)
#  content     :text
#  order       :integer
#  category_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#

class Question < ActiveRecord::Base
	belongs_to :category
	has_many :answers
	has_many :feedbacks
	has_and_belongs_to_many :rubrics
	accepts_nested_attributes_for :answers, allow_destroy: true
end
