class CreateInventoryResponse < ActiveRecord::Migration
  def change
    create_table :inventory_responses do |t|
      t.references :inventory_member, index: true
      t.datetime :submitted_at, null: false
      t.timestamps null: false
    end
  end
end
