class AdjustToolMemberIndices < ActiveRecord::Migration
  def change
    add_index :tool_members, [:tool_id, :tool_type]
  end
end
