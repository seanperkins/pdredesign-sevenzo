class KeyQuestion::Question < ActiveRecord::Base
  belongs_to :question
  has_many   :points,
    foreign_key: :key_question_question_id,
    class_name: 'KeyQuestion::Point',
    dependent: :destroy
end
