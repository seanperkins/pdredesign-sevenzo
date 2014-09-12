class CreateKeyQuestionQuestions < ActiveRecord::Migration
  def change
    create_table :key_question_questions do |t|
      t.belongs_to :question
      t.text :text
      t.timestamps
    end
  end
end
