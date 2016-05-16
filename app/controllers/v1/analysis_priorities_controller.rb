class V1::AnalysisPrioritiesController < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :analysis

  def index
    @categories = []
  end

  def create
    priority = Priority.find_or_initialize_by(tool: current_analysis)
    priority.order = params[:order]
    priority_existed_prior = priority.id.present?

    if priority.save
      render nothing: true, status: (priority_existed_prior ? :no_content : :created)
    else
      render nothing: true, status: :bad_request
    end
  end

  private
  def current_analysis
    Analysis.find(params[:analysis_id])
  end

  def analysis_priority_params
    params.permit(:order)
  end
end