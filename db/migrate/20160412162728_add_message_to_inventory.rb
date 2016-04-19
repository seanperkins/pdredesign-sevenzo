class AddMessageToInventory < ActiveRecord::Migration
  def change
    add_column :inventories, :message, :text
  end
end
