class AddTotalResponseCountToInventory < ActiveRecord::Migration
  def change
    add_column :inventories, :total_participant_responses, :integer, default: 0, null: false
  end
end
