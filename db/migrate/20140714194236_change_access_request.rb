class ChangeAccessRequest < ActiveRecord::Migration
  def change
    add_column :access_requests, :token, :string
  end
end
