class CreateInventoryResponse < ActiveRecord::Migration
  def change
    create_table :inventory_responses do |t|
      t.references :inventory_member, index: true, null: false
      t.datetime :submitted_at
      t.timestamps null: false
    end
  end
end
