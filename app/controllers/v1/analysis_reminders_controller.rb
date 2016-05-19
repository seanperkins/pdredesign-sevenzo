class V1::AnalysisRemindersController < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :analysis

  def create
    ReminderNotificationWorker
        .perform_async(analysis.id, analysis.class.to_s, message)
    render nothing: true
  end
  authority_actions create: 'update'

  private
  def message
    params[:message]
  end

  def analysis
    Analysis.find(params[:analysis_id])
  end
end
