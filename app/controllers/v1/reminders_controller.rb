class V1::RemindersController < ApplicationController
  before_action :authenticate_user!

  authorize_actions_for :assessment

  def create
    ReminderNotificationWorker
      .perform_async(assessment.id, message)
    render nothing: true
  end
  authority_actions create: 'update'

  private 
  def message
    params[:message]
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end
end
