class AddNameToDataEntries < ActiveRecord::Migration
  def change
    add_column :data_entries, :name, :text
  end
end
