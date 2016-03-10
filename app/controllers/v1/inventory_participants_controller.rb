class V1::InventoryParticipantsController < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :inventory

  def create
    params      = participant_params
    user = User.find(params[:user_id])
    permission = Inventories::Permission.new(inventory: inventory, user: user)
    permission.role = 'participant'
    render nothing: true, status: :created
  end
  authority_actions create: 'update'

  def destroy
    user = User.find(params[:user_id])
    permission = Inventories::Permission.new(inventory: inventory, user: user)
    permission.revoke
    render nothing: true
  end

  def index
    @participants = assessment.participants 
  end

  def all
    @users = users_from_district(assessment) 
  end
  authority_actions all: 'update'

  protected

  def users_from_district(assessment)
    district_id = assessment.district_id
    user_ids    = assessment.participants.pluck(:user_id)
    
    users = User
      .includes(:districts)
      .where(districts: { id: district_id})
      .where.not(id: user_ids)
      .reject { |u| u.role.to_sym == :network_partner }
  end

  def participant_params
    params.permit(:inventory_id, :user_id, :id)
  end

  def inventory
    Inventory.find(params[:inventory_id])
  end
end
