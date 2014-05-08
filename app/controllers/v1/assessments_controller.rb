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

  private
  def assessment
    Assessment.find(params[:id])
  end

  def user_assessments(user = current_user)
    Assessment.assessments_for_user(user)
  end
end
