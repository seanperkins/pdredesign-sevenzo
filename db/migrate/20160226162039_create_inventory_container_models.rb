class CreateInventoryContainerModels < ActiveRecord::Migration
  def change
    create_table :product_entries do |t|
      t.references :general_inventory_question, null: false, index: true
      t.references :product_question, null: true, index: true
      t.references :usage_question, null: false, index: true
      t.references :technical_question, null: false, index: true
      t.timestamps
    end

    create_table :data_entries do |t|
      t.references :general_data_question, null: false, index: true
      t.references :data_entry_question, null: false, index: true
      t.references :data_access_question, null: false, index: true
      t.timestamps
    end

    create_table :inventories do |t|
      t.string :name
      t.timestamp :deadline
      t.references :districts
      t.references :product_entry, null: false, index: true
      t.references :data_entry, null: false, index: true
    end

    add_foreign_key :product_entries, :general_inventory_questions, on_delete: :cascade
    add_foreign_key :product_entries, :product_questions, on_delete: :cascade
    add_foreign_key :product_entries, :usage_questions, on_delete: :cascade
    add_foreign_key :product_entries, :technical_questions, on_delete: :cascade

    add_foreign_key :data_entries, :general_data_questions, on_delete: :cascade
    add_foreign_key :data_entries, :data_entry_questions, on_delete: :cascade
    add_foreign_key :data_entries, :data_access_questions, on_delete: :cascade

    add_foreign_key :inventories, :product_entries, on_delete: :cascade
    add_foreign_key :inventories, :data_entries, on_delete: :cascade
  end
end
