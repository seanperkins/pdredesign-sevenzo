class V1::InventoryParticipantsController < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :inventory

  def index
    @participants = inventory.participants
  end

  def create
    params = participant_params
    user = User.find(params[:user_id])
    permission = Inventories::Permission.new(inventory: inventory, user: user)
    permission.role = 'participant'
    render nothing: true, status: :created
  end

  authority_actions create: 'update'

  def destroy
    user = User.find(params[:id])
    permission = Inventories::Permission.new(inventory: inventory, user: user)
    permission.revoke
    render nothing: true
  end

  def all
    participant_ids = inventory.tool_members.select(:user_id).pluck(:user_id)
    @users = User.joins(:districts)
                 .where(districts: {id: inventory.district.id})
                 .where.not(id: participant_ids)
                 .reject { |u| u.role.to_sym == :network_partner }
  end
  authority_actions all: 'update'

  protected
  def participant_params
    params.permit(:inventory_id, :user_id, :id)
  end

  def inventory
    Inventory.find(params[:inventory_id])
  end
end
