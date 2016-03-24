class RenameAndChangeTypeOfPriceColumnInGeneralInventoryQuestions < ActiveRecord::Migration
  def change
    rename_column :general_inventory_questions, :price, :price_in_cents
    change_column :general_inventory_questions, :price_in_cents, :integer
  end
end
