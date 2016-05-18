class AddReportTakeawayToAnalysis < ActiveRecord::Migration
  def change
    add_column :analyses, :report_takeaway, :text
  end
end
