class CreateAnalysis < ActiveRecord::Migration
  def change
    create_table :analyses do |t|
      t.text :name
      t.references :district, index: true, foreign_key: true
      t.datetime :deadline
      t.references :inventory, index: true, foreign_key: true

      t.timestamps
    end
  end
end
