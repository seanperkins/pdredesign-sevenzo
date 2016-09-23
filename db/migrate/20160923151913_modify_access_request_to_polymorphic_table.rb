class ModifyAccessRequestToPolymorphicTable < ActiveRecord::Migration
  def change
    add_column :access_requests, :tool_type, :string
    rename_column :access_requests, :assessment_id, :tool_id

    add_index :access_requests, [:tool_type, :tool_id]
  end
end
