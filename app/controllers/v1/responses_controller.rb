class V1::ResponsesController < ApplicationController
  before_action :authenticate_user!

  def create
    @response = response_by(responder_id: participant_from_user.id)
    authorize_action_for @response
    @response.rubric_id = assessment.rubric_id
    create_empty_scores(@response) if @response.save
  end

  def show
    @response   = Response.find(params[:id])
    @rubric     = assessment.rubric
    @categories = @response.categories
    authorize_action_for @response
  end

  def score_for(response, question)
    scores(response)
      .find_by(question: question)
  end

  private
  def scores(response)
    @scores ||= Score.where(response: response)
  end

  def create_empty_scores(response)
    response.questions.each do |question|
      response.scores.create!(question: question)
    end
  end

  def response_by(options)
    options = { responder_type: 'Participant' }.merge(options) 
    Response.find_or_initialize_by(options)
  end

  def participant_from_user(user = current_user)
    Participant.find_by(user_id: user.id, 
      assessment_id: assessment.id) || Participant.new
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end

end
