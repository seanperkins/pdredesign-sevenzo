# == Schema Information
#
# Table name: key_question_questions
#
#  id          :integer          not null, primary key
#  question_id :integer
#  text        :text
#  created_at  :datetime
#  updated_at  :datetime
#

class KeyQuestion::Question < ActiveRecord::Base
  belongs_to :question
  has_many   :points,
    foreign_key: :key_question_question_id,
    class_name: 'KeyQuestion::Point',
    dependent: :destroy
end
