class CreateAssessmentsNetworkPartners < ActiveRecord::Migration
  def change
    create_table :assessments_network_partners do |t|
      t.belongs_to :assessment
      t.belongs_to :user
    end
  end
end
