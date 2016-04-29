class CreateSupportingInventoryResponse < ActiveRecord::Migration
  def change
    create_table :supporting_inventory_responses do |t|
      t.references :score, index: true
      t.integer :product_entries, default: [], array: true, null: false
      t.integer :data_entries, default: [], array: true, null: false
      t.text :product_entry_evidence
      t.text :data_entry_evidence
      t.timestamps null: false
    end
  end
end
