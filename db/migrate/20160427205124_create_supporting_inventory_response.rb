class CreateSupportingInventoryResponse < ActiveRecord::Migration
  def change
    create_table :supporting_inventory_responses do |t|
      t.references :response, index: true
      t.references :inventory, index: true
      t.integer :product_entries, default: [], array: true, null: false
      t.integer :data_entries, default: [], array: true, null: false
      t.timestamps null: false
    end
  end
end
