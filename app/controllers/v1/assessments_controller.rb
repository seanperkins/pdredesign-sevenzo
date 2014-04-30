class V1::AssessmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @assessments = user_assessments
  end

  private
  def user_assessments(user = current_user)
    Assessment.assessments_for_user(user)
  end
end
