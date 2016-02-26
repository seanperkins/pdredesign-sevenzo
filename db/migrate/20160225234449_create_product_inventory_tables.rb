class CreateProductInventoryTables < ActiveRecord::Migration
  def change
    create_table :general_inventory_questions do |t|
      t.text :product_name
      t.text :vendor
      t.text :point_of_contact_name
      t.text :point_of_contact_department
      t.text :pricing_structure
      t.decimal :price, precision: 9, scale: 2
      t.text :type, array: true
      t.text :purpose, 
      t.timestamps
    end

    create_table :product_questions do |t|
      t.text :how_its_assigned, array: true
      t.text :how_its_used, array: true
      t.text :how_its_accessed, array: true
      t.text :audience, array: true
      t.timestamps
    end

    create_table :usage_questions do |t|
      t.text :school_usage
      t.text :usage
      t.text :vendor_data
      t.text :notes
      t.timestamps
    end

    create_table :technical_questions do |t|
      t.text :platform, array: true
      t.text :hosting
      t.text :connectivity
      t.text :single_sign_on
      t.timestamps
    end
  end
end
