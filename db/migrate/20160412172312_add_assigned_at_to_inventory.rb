class AddAssignedAtToInventory < ActiveRecord::Migration
  def change
    add_column :inventories, :assigned_at, :datetime
  end
end
