class V1::AnalysisResponsesController < ApplicationController
  before_action :authenticate_user!

  def create
    @response = Response.find_or_create_by(responder: analysis)
    authorize_action_for @response

    @response.rubric = analysis.rubric
    if @response.save
      create_empty_scores(@response)
      render nothing: true, status: :created
    else
      render nothing: true, status: :bad_request
    end
  end

  private
  def participant_from_user(user = current_user)
    AnalysisMember.where(user_id: user.id,
                         analysis_id: params[:analysis_id]).first
  end

  def analysis
    Analysis.where(id: params[:analysis_id]).first
  end
end
