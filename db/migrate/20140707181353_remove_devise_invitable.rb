class RemoveDeviseInvitable < ActiveRecord::Migration
  def change
    %i(invitation_token invitation_created_at invitation_sent_at invitation_accepted_at invitation_limit invited_by_id invited_by_type).each do |column|
      remove_column :users, column
    end
  end
end
