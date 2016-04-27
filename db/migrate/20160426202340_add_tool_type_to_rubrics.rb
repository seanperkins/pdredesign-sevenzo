class AddToolTypeToRubrics < ActiveRecord::Migration
  def change
    add_column :rubrics, :tool_type, :string
    add_index :rubrics, :tool_type
  end
end
