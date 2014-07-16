class CreateDistrictMessages < ActiveRecord::Migration
  def change
    create_table :district_messages do |t|
      t.string  :name
      t.string  :address
      t.string  :sender_name
      t.string  :sender_email
      t.timestamps
    end
  end
end
