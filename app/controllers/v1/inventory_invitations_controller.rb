class V1::InventoryInvitationsController < ApplicationController
  before_action :authenticate_user!

  def create
    create_params = invitation_params
    create_params[:inventory_id] = inventory_id

    send_invite = create_params.delete(:send_invite)
    invite = UserInvitation.new(create_params)

    unless invite.save
      @errors = invite.errors.messages
      render 'v1/shared/errors', status: 422
      return
    end

    Invitation::InsertFromInvite.new(invite).execute
    queue_worker(invite.id) if send_invite
    render nothing: true
  end

  private
  def queue_worker(invite_id)
    UserInvitationNotificationWorker.perform_async(invite_id)
  end

  def invitation_params
    params
      .permit(:first_name, :last_name, :email, :send_invite, :team_role, :role)
  end

  def inventory_id
    params[:inventory_id]
  end

  def assessment
    Inventory
      .find(inventory_id)
  end
end
