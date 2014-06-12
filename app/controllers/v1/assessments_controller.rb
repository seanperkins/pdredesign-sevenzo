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
  end

  def update
    @assessment  = assessment
    authorize_action_for @assessment

    update_params = assessment_params
    if update_params[:assign]
      update_params.delete :assign
      update_params[:assigned_at] = Time.now
    end


    @assessment.update(update_params)
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
    OpenStruct.new(id: nil,
      category: "welcome", 
      sent_at:  assessment.updated_at,
      teaser:  assessment.message)
  end

  def assessment_create_params
    params.permit(:rubric_id, :name, :due_date)
  end

  def assessment_params
    params.permit(:rubric_id, :name, :due_date, :message, :assign)
  end

  def assessment
    Assessment.find(params[:id])
  end

  def user_assessments(user = current_user)
    Assessment.assessments_for_user(user)
  end
end
