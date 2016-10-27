class AddReportViewedAtColumnToToolMembers < ActiveRecord::Migration
  def change
    add_column :tool_members, :report_viewed_at, :datetime
    add_index :tool_members, :report_viewed_at
  end
end
