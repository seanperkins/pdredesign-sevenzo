class CreateAssessmentFacilitators < ActiveRecord::Migration
  def change
    create_table :assessments_facilitators do |t|
      t.belongs_to :assessment
      t.belongs_to :user
    end
  end
end
