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
#  help_text   :text
#

class Question < ActiveRecord::Base
	belongs_to :category
	has_one :axis, through: :category

  has_one :key_question, class_name: 'KeyQuestion::Question'

	has_many :answers, dependent: :destroy
	has_many :scores
	has_many :feedbacks

	has_and_belongs_to_many :rubrics
	accepts_nested_attributes_for :answers, allow_destroy: true

  scope :ordered, -> { order(order: :asc) } 
  def ordered_answers
    answers.reorder(value: :asc)
  end

end
