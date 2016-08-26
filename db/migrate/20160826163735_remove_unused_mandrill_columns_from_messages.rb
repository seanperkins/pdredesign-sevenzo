class RemoveUnusedMandrillColumnsFromMessages < ActiveRecord::Migration
  def change
    remove_column :messages, :mandrill_id, :string
    remove_column :messages, :mandrill_html, :text
  end
end
