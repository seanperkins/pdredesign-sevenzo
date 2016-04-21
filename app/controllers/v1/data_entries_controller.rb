class V1::DataEntriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @data_entries = data_entries

    respond_to do |format|
      format.json { render template: 'v1/data_entries/index' }
      format.csv  { render csv: 'data_entries', template: 'v1/data_entries/index' }
    end
  end

  def show
    @data_entry = data_entries.find(params[:id])
    authorize_action_for @data_entry
    render template: 'v1/data_entries/show'
  end

  def create
    @data_entry = inventory.data_entries.new(data_entry_params)
    authorize_action_for @data_entry

    if @data_entry.save
      render template: 'v1/data_entries/show', status: 201
    else
      render_error
    end
  end

  def update
    @data_entry = inventory.data_entries.find(params[:id])
    authorize_action_for @data_entry
    
    if @data_entry.update(data_entry_params)
      render template: 'v1/data_entries/show', status: 200
    else
      render_error
    end
  end

  private
  def inventory
    current_user.inventories.find(params[:inventory_id])
    #Inventory.find(params[:inventory_id])
  end

  def data_entries
    inventory.data_entries
  end

  def render_error
    @errors = @data_entry.errors
    render 'v1/shared/errors', status: 422
  end

  def data_entry_params
    params.permit(
      :name,
      general_data_question_attributes: [
        :data_type,
        :point_of_contact_name,
        :point_of_contact_department,
        :data_capture
      ],
      data_entry_question_attributes: [
        :who_enters_data,
        :how_data_is_entered,
        :when_data_is_entered
      ],
      data_access_question_attributes: [
        :data_storage,
        :who_access_data,
        :how_data_is_accessed,
        :why_data_is_accessed,
        :notes
      ]
    )
  end
end
