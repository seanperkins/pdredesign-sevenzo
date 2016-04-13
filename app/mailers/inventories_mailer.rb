class InventoriesMailer < ApplicationMailer
  def assigned(inventory, participant)
    @first_name = participant.user.first_name
    @facilitator = inventory.owner
    @inventory_name = inventory.name
    @district_name = inventory.district.name
    @inventory_link = inventory_url(inventory.id)
    @deadline = inventory.deadline.strftime("%B %d, %Y")
    @message = inventory.message && inventory.message.html_safe

    subject = 'Invited to Contribute to Inventory'
    mail(subject: subject, to: participant.user.email) do |format|
      format.html { render 'inventory_invitation_mailer/invite' }
      format.text { render 'inventory_invitation_mailer/invite' }
    end
  end

  def reminder(inventory, message, participant)
    @participant_name = participant.user.first_name
    @facilitator_name = inventory.user.name
    @inventory_name = inventory.name
    @inventory_link = inventory_url(inventory.id)
    @district_name = inventory.district.name
    @deadline = inventory.due_date.strftime("%B %d, %Y")
    @message = message.html_safe

    mail(subject: 'Inventory Reminder', to: participant.user.email)
  end
end