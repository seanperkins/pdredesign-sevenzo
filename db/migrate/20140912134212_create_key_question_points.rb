class CreateKeyQuestionPoints < ActiveRecord::Migration
  def change
    create_table :key_question_points do |t|
      t.belongs_to :key_question_question
      t.text :text
      t.timestamps
    end
  end
end
