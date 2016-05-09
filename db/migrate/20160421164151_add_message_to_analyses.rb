class AddMessageToAnalyses < ActiveRecord::Migration
  def change
    add_column :analyses, :message, :text
  end
end
