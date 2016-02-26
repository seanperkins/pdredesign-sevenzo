class CreateProductInventoryTables < ActiveRecord::Migration
  def change
    create_table :general_inventory_questions do |t|
      t.text :product_name, null: false
      t.text :vendor, null: false
      t.text :point_of_contact_name, null: false
      t.text :point_of_contact_department, null: false
      t.text :pricing_structure, null: false
      t.decimal :price, precision: 9, scale: 2, null: false
      t.text :type, array: true, null: false
      t.text :purpose, null: false
      t.timestamps
    end

    create_table :product_questions do |t|
      t.text :how_its_assigned, array: true, null: false
      t.text :how_its_used, array: true, null: false
      t.text :how_its_accessed, array: true ,null: false
      t.text :audience, array: true, null: false
      t.timestamps
    end

    create_table :usage_questions do |t|
      t.text :school_usage, null: false
      t.text :usage, null: false
      t.text :vendor_data, null: false
      t.text :notes
      t.timestamps
    end

    create_table :technical_questions do |t|
      t.text :platform, array: true, null: false
      t.text :hosting, null: false
      t.text :connectivity, null: false
      t.text :single_sign_on, null: false
      t.timestamps
    end
  end
end
