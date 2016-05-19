class AddRemindedAtToAnalysisMember < ActiveRecord::Migration
  def change
    add_column :analysis_members, :reminded_at, :datetime
  end
end
