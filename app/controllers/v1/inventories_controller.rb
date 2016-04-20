class V1::InventoriesController < ApplicationController

  before_action :authenticate_user!

  def index
    @inventories = current_user.inventories
  end

  def show
    @inventory = Inventory.where(id: params[:id]).first
    unless @inventory
      render nothing: true, status: :not_found
      return
    end
    @messages = messages
    authorize_action_for @inventory
  end

  def create
    @inventory = Inventory.new
    authorize_action_for @inventory
    @inventory.name = inventory_params[:name]
    unless inventory_params[:deadline].blank?
      begin
        @inventory.deadline = DateTime.strptime(inventory_params[:deadline], '%m/%d/%Y')
      rescue
        @inventory.errors.add(:deadline, 'must be in MM/DD/YYYY format')
        return render_error
      end
    end
    @inventory.district = District.find(inventory_params[:district][:id])
    @inventory.owner = current_user
    if @inventory.save
      render template: 'v1/inventories/show'
    else
      render_error
    end
  end

  def update
    @inventory = inventory
    authorize_action_for inventory

    saved = @inventory.update(inventory_params)
    if saved
      if inventory_params[:assign]
        AllInventoryParticipantsNotificationWorker.perform_async(@inventory.id)
      end
      render nothing: true, status: :no_content
    else
      render_error
    end
  end

  def district_product_entries
    @product_entries = ProductEntry.for_district(params[:id])

    render template: 'v1/product_entries/index'
  end

  def mark_complete
    member = inventory.members.where(user: current_user).first
    response = InventoryResponse.find_or_create_by(inventory_member: member)
    response.submitted_at = Time.now

    if response.save
      render nothing: true
    else
      render json: {
          errors: response.errors,
      }, status: :bad_request
    end
  end

  def save_response
    member = inventory.members.where(user: current_user).first
    response = InventoryResponse.find_or_create_by(inventory_member: member)
    if response.save
      render nothing: true
    else
      render json: {
          errors: response.errors,
          status: :bad_request
      }
    end
  end

  def participant_has_not_responded
    member = inventory.members.where(user: current_user).first
    if member.has_responded?
      render nothing: true, status: :unauthorized
    else
      render nothing: true, status: :no_content
    end
  end

  private
  def inventory_params
    params.require(:inventory).permit(:name, :deadline, :district_id, :message, :assign, district: [:id])
  end

  def render_error
    render json: {
        errors: @inventory.errors,
    }, status: :bad_request
  end

  def inventory
    Inventory.where(id: (params[:inventory_id] || params[:id])).first
  end

  def messages
    messages = []
    messages.concat inventory.messages
    messages.push welcome_message
  end

  def welcome_message
    OpenStruct.new(id: nil,
                   category: 'welcome',
                   sent_at: inventory.updated_at,
                   teaser: inventory.message)
  end
end
