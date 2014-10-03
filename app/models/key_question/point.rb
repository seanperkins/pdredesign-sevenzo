# == Schema Information
#
# Table name: key_question_points
#
#  id                       :integer          not null, primary key
#  key_question_question_id :integer
#  text                     :text
#  created_at               :datetime
#  updated_at               :datetime
#

class KeyQuestion::Point < ActiveRecord::Base
  belongs_to :key_question, foreign_key: :key_question_question_id, class_name: 'KeyQuestion::Question'
end
