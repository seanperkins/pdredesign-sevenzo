class RemoveDataAndProductColumnsFromInventory < ActiveRecord::Migration
  def change
    remove_column :inventories, :data_entry_id
    remove_column :inventories, :product_entry_id
  end
end
