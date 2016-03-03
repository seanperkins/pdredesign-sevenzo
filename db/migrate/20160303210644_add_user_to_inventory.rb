class AddUserToInventory < ActiveRecord::Migration
  def change
    change_table :inventories do |t|
      t.references :user, null: false
    end
  end
end
