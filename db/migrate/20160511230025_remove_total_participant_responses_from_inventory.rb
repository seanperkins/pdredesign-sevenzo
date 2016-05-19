class RemoveTotalParticipantResponsesFromInventory < ActiveRecord::Migration
  def change
    remove_column :inventories, :total_participant_responses
  end
end
