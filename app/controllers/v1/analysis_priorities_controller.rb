class V1::AnalysisPrioritiesController < ApplicationController
  include SharedInventoryFetch
  include SharedAnalysisFetch
  before_action :authenticate_user!, except: :index

  def index
    @scores_and_relevant_data = Analyses::Priority.new(analysis: current_analysis).ordered_list
  end

  authority_actions index: :read

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

  authority_actions create: :create

  private
  def current_analysis
    @analysis ||= analysis
  end

  def analysis_priority_params
    params.permit(:order)
  end
end
