class AddShareTokenToAnalyses < ActiveRecord::Migration
  def change
    add_column :analyses, :share_token, :string
  end
end
