class AddAssignedAtToAnalyses < ActiveRecord::Migration
  def change
    add_column :analyses, :assigned_at, :datetime
  end
end
