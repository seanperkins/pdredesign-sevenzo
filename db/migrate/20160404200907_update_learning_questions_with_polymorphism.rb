class UpdateLearningQuestionsWithPolymorphism < ActiveRecord::Migration
  def change
    rename_column :learning_questions, :assessment_id, :tool_id
    add_column :learning_questions, :tool_type, :string
  end
end
