class CreateAnalysisMembers < ActiveRecord::Migration
  def change
    create_table :analysis_members do |t|
      t.references :analysis, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.string :role

      t.datetime :invited_at

      t.timestamps
    end
  end
end
