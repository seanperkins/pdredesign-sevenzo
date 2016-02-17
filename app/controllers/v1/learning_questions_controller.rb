class V1::LearningQuestionsController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_assessment, only: [:index, :create]

  def index
    if @assessment.user == current_user || @assessment.users.include?(current_user)
      @learning_questions = LearningQuestion.where(assessment: @assessment)
      render 'v1/learning_questions/index'
    else
      @errors = 'You are not a part of this assessment, so you cannot see any learning questions.'
      render 'v1/shared/errors', status: 400
    end
  end

  def create
    if @assessment.user == current_user || @assessment.users.include?(current_user)
      @learning_question = LearningQuestion.new(learning_question_params)
      @learning_question.assessment = @assessment
      @learning_question.user = current_user
      if @learning_question.save
        render 'v1/learning_questions/show'
      else
        @errors = @learning_question.errors
        render 'v1/shared/errors', status: 400
      end
    else
      @errors = 'User is not a part of this assessment'
      render 'v1/shared/errors', status: 400
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