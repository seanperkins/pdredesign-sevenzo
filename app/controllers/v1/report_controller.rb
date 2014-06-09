class V1::ReportController < ApplicationController
  before_action :authenticate_user!

  def show
    @assessment = assessment
    authorize_action_for @assessment
    @response   = assessment_response
    @axes       = axes
  end

  def axis_questions(response, axis)
    response
      .questions
      .joins(:category)
      .where(categories: {axis_id: axis.id})
  end

  def average(assessment, axis)
    ids = assessment.participant_responses.pluck(:id)
    Score
      .joins(question: { category:  :axis })
      .where(response_id: ids)
      .where.not(value: nil)
      .where("categories.axis_id = ? ", axis.id)
      .average(:value)
  end

  private
  def axes
    axes = assessment_response
      .questions
      .joins(:axis)
      .pluck(:axis_id)
      .uniq
    Axis.where(id: axes)
  end

  def assessment_response
    assessment.response || Response.new
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end
end

