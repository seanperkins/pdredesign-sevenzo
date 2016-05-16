class AddOwnerToAnalysis < ActiveRecord::Migration
  def change
    add_reference :analyses, :owner, references: :users, index: true
  end
end
