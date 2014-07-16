class CreateAccessRequests < ActiveRecord::Migration
  def change
    create_table :access_requests do |t|
      t.belongs_to :assessment
      t.belongs_to :user
      t.string :roles, array: true, default: []
      t.timestamps
    end
  end
end
