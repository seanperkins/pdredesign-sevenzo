class UpdateInventoryMemberWithRemindedAtColumn < ActiveRecord::Migration
  def change
    add_column :inventory_members, :reminded_at, :datetime
  end
end
