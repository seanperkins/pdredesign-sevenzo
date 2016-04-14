class MigrateExistingLearningQuestionsToAssessmentsOnly < ActiveRecord::Migration
  def change
    LearningQuestion.update_all(tool_type: 'Assessment')
  end
end
