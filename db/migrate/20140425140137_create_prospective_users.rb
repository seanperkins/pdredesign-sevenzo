class CreateProspectiveUsers < ActiveRecord::Migration
  def change
    create_table :prospective_users do |t|
      t.string :ip_address
      t.string :email
      t.timestamps
    end
  end
end
