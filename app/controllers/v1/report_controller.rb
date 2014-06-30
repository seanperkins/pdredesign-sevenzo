class V1::ReportController < ApplicationController
  before_action :authenticate_user!

  delegate :axis_questions, to: :report
  delegate :average, to: :report

  def show
    @assessment = assessment
    authorize_action_for @assessment
    @response   = @assessment.response
    @axes       = report.axes
  end

  private
  def report 
    @report ||= Assessments::Report.new(assessment)
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end
end

