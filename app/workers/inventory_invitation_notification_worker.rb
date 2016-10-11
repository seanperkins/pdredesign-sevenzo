class InventoryInvitationNotificationWorker
  include ::Sidekiq::Worker

  def perform(invite_id)
    invite = InventoryInvitation.find(invite_id)
    InventoryInvitationMailer.invite(invite).deliver_now

    member = ToolMember.where(user_id: invite.user_id,
                              tool_type: 'Inventory',
                              tool_id: invite.inventory_id).first
    member.invited_at = Time.now
    member.save
  end
end
