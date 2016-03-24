class V1::ProductEntriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @product_entries = product_entries
    render json: @product_entries
  end

  def show
    @product_entry = product_entries.find(params[:id])
    render json: @product_entry
  end

  def create
    @product_entry = inventory.product_entries.new(product_entry_params)
    # XXX authorize_action_for...?

    if @product_entry.save
      render nothing: true, status: 201
    else
      @errors = @product_entry.errors
      render 'v1/shared/errors', status: 422
    end
  end

  def update
    @product_entry = inventory.product_entries.find(params[:id])
    # XXX authorize_action_for...?
    
    if @product_entry.update(product_entry_params)
      render nothing: true, status: 200
    else
      @errors = @product_entry.errors
      render 'v1/shared/errors', status: 422
    end
  end

  private
  def inventory
    # XXX should this be scoped to current_user? current_user.inventories.find...
    Inventory.find(params[:inventory_id])
  end

  def product_entries
    inventory.product_entries
  end

  def product_entry_params
    params.permit(
      product_question_attributes: [
        :how_its_assigned,
        :how_its_used,
        :how_its_accessed,
        :audience
      ],
      usage_question_attributes: [
        :school_usage,
        :usage,
        :vendor_data,
        :notes
      ],
      technical_question_attributes: [
        :platform,
        :hosting,
        :connectivity,
        :single_sign_on
      ],
      general_inventory_question_attributes: [
        :product_name,
        :vendor,
        :point_of_contact_name,
        :point_of_contact_department,
        :pricing_structure,
        :price_in_cents,
        {data_type: []},
        :purpose
      ]
    )
  end
end
