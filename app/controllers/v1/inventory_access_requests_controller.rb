class V1::InventoryAccessRequestsController < ApplicationController
  before_action :authenticate_user!
  before_action :inventory

  def create
    permission = Inventories::Permission.new(inventory: inventory, user: current_user)
    @request = permission.request_access(role: request_params[:role])
    if @request.new_record?
      @errors = @request.errors
      render 'v1/shared/errors', errors: @errors, status: 422
      return
    end
    render json: @request
  end

  private
  def inventory_id
    params[:inventory_id]
  end

  def inventory
    @inventory ||= Inventory.find(inventory_id)
  end

  def request_params
    params.permit(:inventory, :role)
  end
end
 
