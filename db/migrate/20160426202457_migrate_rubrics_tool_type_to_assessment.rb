class MigrateRubricsToolTypeToAssessment < ActiveRecord::Migration
  def change
    Rubric.update_all(tool_type: 'Assessment')
  end
end
