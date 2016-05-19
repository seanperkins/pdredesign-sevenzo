class CreateAnalysisAccessRequest < ActiveRecord::Migration
  def change
    create_table :analysis_access_requests do |t|
      t.references :analysis, null: false, foreign_key: { on_delete: :cascade, on_update: :cascade }
      t.references :user, null: false, foreign_key: { on_delete: :cascade, on_update: :cascade }
      t.string :role, null: false
      t.string :token
      t.timestamps
    end
  end
end
