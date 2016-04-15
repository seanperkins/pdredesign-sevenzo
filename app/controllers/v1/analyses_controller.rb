class V1::AnalysesController < ApplicationController
  before_action :authenticate_user!

  def create
    @analysis = inventory.build_analysis(analysis_params)
    authorize_action_for @analysis

    if @analysis.save
      render template: 'v1/analyses/show', status: 201
    else
      render_error
    end
  end

  private
  def inventory
    current_user.inventories.find(params[:inventory_id])
  end

  def render_error
    @errors = @analyses.errors
    render 'v1/shared/errors', status: 422
  end

  def analysis_params
    params.permit(
      :name,
      :district_id,
      :deadline
    )
  end
end
