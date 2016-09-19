class CreateToolMembers < ActiveRecord::Migration
  def change
    create_table :tool_members, id: false do |t|
      t.string :tool_type
      t.integer :tool_id
      t.integer :role
      t.references :user, null: false
      t.timestamp :invited_at
      t.timestamp :reminded_at
      t.timestamps null: false
    end

    add_index :tool_members, [:user_id, :role, :tool_id, :tool_type],
              unique: true,
              name: 'idx_tool_members_unique'
  end
end
