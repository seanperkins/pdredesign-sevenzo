class V1::ReportController < ApplicationController
  before_action :authenticate_user!

  delegate :axis_questions, to: :report
  delegate :average, to: :report

  def show
    @assessment = assessment
    authorize_action_for @assessment
    @response   = @assessment.response
    @axes       = report.axes
    update_participant
  end

  private
  def report 
    @report ||= Assessments::Report.new(assessment)
  end

  def update_participant
    return unless participant
    participant.update(report_viewed_at: Time.now)
  end

  def participant
    Participant.find_by(assessment: assessment, user: current_user)
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end
end

