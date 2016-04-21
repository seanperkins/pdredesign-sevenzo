class V1::AnalysesController < ApplicationController
  before_action :authenticate_user!

  def index
    @analysis = inventory.analysis
    authorize_action_for @analysis
    render template: 'v1/analyses/show', status: 200
  end

  def create
    @analysis = inventory.build_analysis(analysis_params)
    authorize_action_for @analysis

    if @analysis.save
      render template: 'v1/analyses/show', status: 201
    else
      render_error
    end
  end

  def update
    @analysis = inventory.analysis
    authorize_action_for @analysis

    if @analysis.update(analysis_params)
      render nothing: true
    else
      render_error
    end
  end

  private
  def inventory
    current_user.inventories.find(params[:inventory_id])
  end

  def render_error
    @errors = @analysis.errors
    render 'v1/shared/errors', status: 422
  end

  def analysis_params
    # converting from US format because that's what the frontend is sending us
    params[:deadline] = begin
      Date.strptime(params[:deadline], '%m/%d/%Y')
    rescue
      # because the frontend sends dates in different ways
      Date.parse(params[:deadline])
    end

    params.permit(
      :name,
      :deadline,
      :message
    )
  end
end
