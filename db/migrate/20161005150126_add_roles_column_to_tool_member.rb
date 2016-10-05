class AddRolesColumnToToolMember < ActiveRecord::Migration
  def change
    add_column :tool_members, :roles, :integer, array: true, default: []
    add_index :tool_members, :roles, using: 'gin'
  end
end
