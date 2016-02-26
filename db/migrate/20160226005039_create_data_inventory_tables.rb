class CreateDataInventoryTables < ActiveRecord::Migration
  def change
    create_table :general_data_questions do |t|
      t.string :subcategory, null: false
      t.string :point_of_contact_name, null: false
      t.string :point_of_contact_department, null: false
      t.string :data_capture, null: false
      t.timestamps
    end

    create_table :data_entry do |t|
      t.string :who_enters_data, null: false
      t.string :how_data_is_entered, null: false
      t.string :when_data_is_entered, null: false
      t.timestamps
    end

    create_table :data_access do |t|
      t.string :data_storage, null: false
      t.string :who_access_data, null: false
      t.string :how_data_is_accessed, null: false
      t.string :why_data_is_accessed, null: false
      t.string :notes
      t.timestamps
    end
  end
end
