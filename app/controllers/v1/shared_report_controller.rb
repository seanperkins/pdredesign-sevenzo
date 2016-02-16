class V1::SharedReportController < ApplicationController
  before_filter :load_assessment!
  delegate :axis_questions, to: :report
  delegate :average, to: :report

  def show
    @assessment = assessment
    @response   = @assessment.response
    @axes       = report.axes
    update_participant
    render 'v1/report/show'
  end

  def consensus_report
    @assessment   = assessment
    @rubric       = assessment.rubric
    @response     = consensus
    if @response
      @categories   = @response.categories  
    else
      not_found
    end
  end

  def participant_consensu_report
    @assessment   = assessment
    @consensus    = consensus
    if @assessment && @consensus
      @participant  = Participant.find_by(assessment: assessment)
    else
      not_found
    end
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
    @assessment ||= Assessment.where(share_token: request_share_token).first
  end

  def load_assessment!
    return true if assessment
    render nothing: true, status: :not_found
  end

  def request_share_token
    params[:shared_id]
  end

  def consensus
    Response.find_by(responder_type: 'Assessment', id: params[:consensu_id])
  end
end
