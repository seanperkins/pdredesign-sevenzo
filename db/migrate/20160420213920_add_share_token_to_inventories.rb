class AddShareTokenToInventories < ActiveRecord::Migration
  def change
    add_column :inventories, :share_token, :string
  end
end
