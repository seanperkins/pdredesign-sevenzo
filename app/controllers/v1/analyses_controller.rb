class V1::AnalysesController < ApplicationController
  include SharedInventoryFetch
  include SharedAnalysisFetch
  before_action :authenticate_user!, except: [:show]

  def index
    @analyses = inventory.analyses

    render template: 'v1/analyses/index', status: 200
  end

  def all
    @analyses = Analysis.joins(:inventory).where(inventories: {district_id: current_user.districts})
    render template: 'v1/analyses/index', status: 200
  end

  def show
    @analysis = analysis
    render template: 'v1/analyses/show', status: 200
  end

  def create
    @analysis = inventory.analyses.build(analysis_params)
    @analysis.rubric = pick_rubric
    authorize_action_for @analysis
    @analysis.owner = current_user

    if @analysis.save
      render template: 'v1/analyses/show', status: 201
    else
      render_error
    end
  end

  def update
    @analysis = inventory.analyses.find(params[:id])
    authorize_action_for @analysis

    saved = @analysis.update(analysis_params)
    if saved
      if analysis_params[:assign]
        AllAnalysisParticipantsNotificationWorker.perform_async(@analysis.id)
      end
      render nothing: true, status: :no_content
    else
      render_error
    end
  end

  private

  def render_error
    @errors = @analysis.errors
    render 'v1/shared/errors', status: 422
  end

  def analysis_params
    params.permit(
      :name,
      :deadline,
      :message,
      :assign,
      :report_takeaway
    )
  end

  def pick_rubric
    Rubric.analysis_driven.where.not(version: nil).order(version: :desc).first
  end

  def messages
    messages = []
    messages.concat @analysis.messages
    messages.push welcome_message
  end

  def welcome_message
    OpenStruct.new(id: nil,
                   category: 'welcome',
                   sent_at: @analysis.updated_at,
                   teaser: @analysis.message)
  end
end
