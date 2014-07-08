class CreateAssessmentViewers < ActiveRecord::Migration
  def change
    create_table :assessments_viewers do |t|
      t.belongs_to :assessment
      t.belongs_to :user
    end
  end
end
