class CreateAnalysisInvitations < ActiveRecord::Migration
  def change
    create_table :analysis_invitations do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :team_role
      t.string :role
      t.string :token
      t.references :analysis, null: false, index: true, foreign_key: { on_delete: :cascade, on_update: :cascade }
      t.references :user, index: true, foreign_key: { on_delete: :cascade, on_update: :cascade }
    end
  end
end
