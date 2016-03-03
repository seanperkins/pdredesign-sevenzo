class V1::InventoriesController < ApplicationController

  before_action :authenticate_user!

  def index
    @inventories = Inventory.where(user: current_user)
  end

  def create
    @inventory = Inventory.new(inventory_params)
    @inventory.user = current_user
    if @inventory.save
      render template: 'v1/inventories/show'
    else
      render json: {
          errors: @inventory.errors.full_messages,
      }, status: :bad_request
    end
  end

  private
  def inventory_params
    params.require(:inventory).permit(:name, :deadline, :district_id)
  end

end