class RenameGeneralDataQuestionsSubcategoryToDataType < ActiveRecord::Migration
  def change
    rename_column :general_data_questions, :subcategory, :data_type
  end
end
