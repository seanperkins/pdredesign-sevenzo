class AllInventoryParticipantsNotificationWorker
  include ::Sidekiq::Worker

  def perform(inventory_id)
    inventory = Inventory.find_by(id: inventory_id)
    inventory.participants.each do |participant|
      next if invited_participant?(participant)
      record = invite_record(inventory_id, participant)

      if record
        send_invitation_email(record)
      else
        send_inventory_mail(inventory, participant)
      end

      mark_invited(participant)
    end
  end

  private
  def mark_invited(participant)
    participant.update(invited_at: Time.now)
  end

  def send_invitation_email(invitation_record)
    InventoryInvitationMailer
        .invite(invitation_record)
        .deliver_now
  end

  def send_inventory_mail(inventory, participant)
    InventoriesMailer
        .assigned(inventory, participant)
        .deliver_now
  end

  def invite_record(inventory_id, participant)
    InventoryInvitation.find_by(inventory_id: inventory_id,
                                user_id: participant.user.id)
  end

  def invited_participant?(participant)
    participant.invited_at
  end
end
