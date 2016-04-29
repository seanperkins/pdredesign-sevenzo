class V1::AnalysisConsensusController < ApplicationController
  def create
    @response = Response.find_or_initialize_by(responder: analysis)
    authorize_action_for @response
    @response.save
  end

  def update
    authorize_action_for analysis
    @response = response

    if consensus_params[:submit]
      @response.update(submitted_at: Time.now)
    end

    render nothing: true
  end

  def show
    @response = response
    authorize_action_for @response
    if @response
      @rubric = response.responder.rubric
      @categories = response.categories
      @team_role = params[:team_role]
      @team_roles = []
    else
      not_found
    end
  end

  private
  def consensus_params
    params.permit(:submit)
  end

  def response
    Response.where(responder: analysis).first
  end

  def analysis
    Analysis.where(id: params[:analysis_id]).first
  end
end
