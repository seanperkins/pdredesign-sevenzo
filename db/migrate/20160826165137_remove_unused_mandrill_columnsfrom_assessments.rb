class RemoveUnusedMandrillColumnsfromAssessments < ActiveRecord::Migration
  def change
    remove_column :assessments, :mandrill_id, :string
    remove_column :assessments, :mandrill_html, :text
  end
end
