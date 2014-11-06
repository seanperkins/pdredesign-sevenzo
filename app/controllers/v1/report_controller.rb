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

  def consensus_report
    @assessment   = assessment
    @rubric       = assessment.rubric
    @response     = consensus
    not_found and return unless @response
    @categories   = @response.categories
    not_found and return unless @categories
  end

  def participant_consensu_report
    @assessment   = assessment
    @consensu     = consensus
    @participant  = Participant.find_by(assessment: assessment)
    not_found and return unless @response
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
    Assessment.find_by(id: params[:assessment_id])
  end

  def consensus
    Response.find_by(responder_type: 'Assessment', id: params[:consensu_id])
  end
end

