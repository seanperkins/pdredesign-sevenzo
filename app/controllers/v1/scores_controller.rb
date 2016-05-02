class V1::ScoresController < ApplicationController
  before_action :authenticate_user!
  after_action :flush_assessment_cache, only: [:create]

  def create
    authorize_action_for user_response

    score = find_or_initialize
    score.update_attributes(score_params)
    status(200) and return if score.save

    @errors = score.errors
    render 'v1/shared/errors', status: 422
  end

  def index
    @rubric = resource.rubric
    @user_response = user_response
    @questions = []

    user_response.categories.each do |category|
      category.rubric_questions(@rubric).each do |question|
        @questions << question
      end
    end
  end

  def fetch_score(question:, response:)
    Score.includes(:supporting_inventory_response).where(question: question, response: response).first
  end

  private
  def find_or_initialize
    Score.find_or_initialize_by(
        response_id: response_id,
        question_id: params[:question_id])
  end

  def score_params
    params.permit(:response_id, :question_id, :value, :evidence)
  end

  def response_id
    params[:response_id] || params[:analysis_response_id]
  end

  def user_response
    Response.where(id: response_id).first
  end

  def resource
    if params[:assessment_id]
      Assessment.where(id: params[:assessment_id]).first
    elsif params[:analysis_id]
      Analysis.where(id: params[:analysis_id]).first
    end
  end

  def flush_assessment_cache
    resource.try(:flush_cached_version)
  end
end

