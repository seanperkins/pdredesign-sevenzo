class InventoryInvitationMailer < ApplicationMailer
  def invite(user_invitation)
    invite = InventoryInvitation.find(user_invitation)
    user = invite.user
    inventory = invite.inventory

    @first_name = user.first_name
    @facilitator = inventory.owner
    @inventory_name = inventory.name
    @district_name = inventory.district.name
    @deadline = inventory.deadline.strftime("%B %d, %Y")
    @inventory_link = invite_url(invite.token)
    @message = inventory.message.try(:html_safe)

    mail(to: invite.email)
  end

  private
  def invite_url(token)
    "#{ENV['BASE_URL']}/#/inventories/invitations/#{token}"
  end

  def default_avatar
    ActionController::Base.helpers.asset_path('fallback/default.png')
  end
end
