class AddRubricIdToAnalysis < ActiveRecord::Migration
  def change
    add_reference :analyses, :rubric
  end
end
