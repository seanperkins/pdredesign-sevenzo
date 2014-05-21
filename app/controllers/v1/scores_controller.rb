class V1::ScoresController < ApplicationController
  before_action :authenticate_user!
  
  def create
    authorize_action_for user_response

    find_or_initialize.tap do |score|
      score.update_attributes(score_params)
      score.save
    end

    render nothing: true
  end

  private
  def find_or_initialize
    Score.find_or_initialize_by(
      response_id: params[:response_id],
      question_id: params[:question_id])
  end

  def score_params
    params.permit(:response_id, :question_id, :value, :evidence)
  end

  def user_response
    Response.find(params[:response_id])
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end

end

