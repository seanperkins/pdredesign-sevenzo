class RemoveDistrictIdFromAnalyses < ActiveRecord::Migration
  def change
    remove_column :analyses, :district_id, :integer
  end
end
