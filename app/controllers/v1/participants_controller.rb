class V1::ParticipantsController < ApplicationController

  before_action :authenticate_user!
  authorize_actions_for :assessment

  def create
    Participant.create!(participant_params)
    render nothing: true
  end
  authority_actions create: 'update'

  def destroy
    participant = Participant.find_by(participant_params)
    if participant
      participant.delete
      render nothing: true
    else
      render status: 404, nothing: true
    end
  end

  def index
    @participants = assessment.participants 
  end

  def all
    @participants = participants_from_district(assessment.district_id) 
    render :index
  end
  authority_actions all: 'create'

  protected
  def participants_from_district(district_id)
    Participant
      .includes(:assessment)
      .where(assessments: { district_id: district_id })
  end

  def participant_params
    params.permit(:assessment_id, :user_id, :id)
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end
end
