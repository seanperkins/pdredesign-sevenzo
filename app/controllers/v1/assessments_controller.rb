class V1::AssessmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @assessments = user_assessments
    @role        = current_user.role.to_sym
  end

  def show
    @assessment = assessment
    authorize_action_for @assessment
  end

  def update
    @assessment  = assessment
    authorize_action_for @assessment

    @assessment.update(assessment_params)
    render nothing: true
  end

  private
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
