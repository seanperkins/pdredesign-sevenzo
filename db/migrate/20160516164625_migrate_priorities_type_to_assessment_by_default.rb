class MigratePrioritiesTypeToAssessmentByDefault < ActiveRecord::Migration
  def change
    Priority.update_all(tool_type: Assessment.to_s)
  end
end
