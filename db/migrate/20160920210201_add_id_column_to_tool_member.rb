class AddIdColumnToToolMember < ActiveRecord::Migration
  def change
    add_column :tool_members, :id, :primary_key
  end
end
