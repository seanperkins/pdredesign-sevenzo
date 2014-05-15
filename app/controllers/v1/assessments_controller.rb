class V1::AssessmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @assessments = user_assessments
    @role        = current_user.role.to_sym
  end

  def show
    @assessment = assessment
    authorize_action_for @assessment
    @messages   = messages
    @overview   = Assessments::Report::Overview.new(@assessment)
  end

  def update
    @assessment  = assessment
    authorize_action_for @assessment

    @assessment.update(assessment_params)
    render nothing: true
  end

  def create
    @assessment = Assessment.new(assessment_create_params)
    authorize_action_for @assessment

    @assessment.user = current_user
    @assessment.district_id = current_user.district_ids.first

    if @assessment.save
      render :show
    else
      @errors = @assessment.errors
      render 'v1/shared/errors', status: 422
    end
  end

  private
  def messages
    messages = []
    messages.concat assessment.messages
    messages.push welcome_message
  end

  def welcome_message
    OpenStruct.new(category: "welcome", 
                sent_at:  assessment.updated_at,
                content:  assessment.message)
  end

  def assessment_create_params
    params.permit(:rubric_id, :name, :due_date)
  end

  def assessment_params
    params.permit(:rubric_id, :name, :due_date, :message)
  end

  def assessment
    Assessment.find(params[:id])
  end

  def user_assessments(user = current_user)
    Assessment.assessments_for_user(user)
  end
end
