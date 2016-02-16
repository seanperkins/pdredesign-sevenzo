class V1::LearningQuestionsController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_assessment

  def create
    if @assessment.user == current_user || @assessment.users.include?(current_user)
      @learning_question = LearningQuestion.new(learning_question_params)
      @learning_question.assessment = @assessment
      @learning_question.user = current_user
      if @learning_question.save
        render 'v1/learning_questions/show'
      else
        @errors = @learning_question.errors
        render 'v1/shared/errors'
      end
    else
      @errors = 'User is not a part of this assessment'
      render 'v1/shared/errors'
    end
  end

  private
  def learning_question_params
    params.require(:learning_question).permit(:body)
  end

  def fetch_assessment
    @assessment = Assessment.find(params[:assessment_id])
  end
end