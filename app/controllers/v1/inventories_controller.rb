class V1::InventoriesController < ApplicationController

  before_action :authenticate_user!

  def index
    @inventories = Inventory.where(user: current_user)
  end

  def create
    @inventory = Inventory.new
    @inventory.name = inventory_params[:name]
    unless inventory_params[:deadline].blank?
      begin
        @inventory.deadline = DateTime.strptime(inventory_params[:deadline], '%m/%d/%Y')
      rescue
        @inventory.errors.add(:deadline, 'must be in DD/MM/YYYY format')
        return render_error
      end
    end
    @inventory.district = District.find(inventory_params[:district][:id])
    @inventory.user = current_user
    if @inventory.save
      render template: 'v1/inventories/show'
    else
      render_error
    end
  end

  private
  def inventory_params
    params.require(:inventory).permit(:name, :deadline, district: [:id])
  end

  def render_error
    render json: {
        errors: @inventory.errors,
    }, status: :bad_request
  end
end
