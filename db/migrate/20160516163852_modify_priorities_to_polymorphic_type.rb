class ModifyPrioritiesToPolymorphicType < ActiveRecord::Migration
  def change
    add_column :priorities, :tool_type, :string
    rename_column :priorities, :assessment_id, :tool_id

    add_index :priorities, [:tool_type, :tool_id]
  end
end
