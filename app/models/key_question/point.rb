class KeyQuestion::Point < ActiveRecord::Base
  belongs_to :key_question, foreign_key: :key_question_question_id, class_name: 'KeyQuestion::Question'
end
