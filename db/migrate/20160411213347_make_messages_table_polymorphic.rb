class MakeMessagesTablePolymorphic < ActiveRecord::Migration
  def change
    rename_column :messages, :assessment_id, :tool_id
    add_column :messages, :tool_type, :string

    add_index :messages, [:tool_type, :tool_id]
  end
end
