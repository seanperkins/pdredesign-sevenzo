class V1::MessagesController < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :find_tool

  def create
    candidate_tool = find_tool
    if candidate_tool
      tool = candidate_tool.first
      ReminderNotificationWorker
          .perform_async(tool.id, tool.class.to_s, params[:message])
      render nothing: true, status: :created
    else

    end

  end
  authority_actions create: 'update'

  def index
    @messages ||= Message.where(tool: find_tool).order(sent_at: :desc)
    render 'v1/messages/index'
  end

  private
  def message_params
    params.permit(:message)
  end

  def find_tool
    if params[:analysis_id]
      Analysis.where(id: params[:analysis_id])
    elsif params[:assessment_id]
      Assessment.where(id: params[:assessment_id])
    elsif params[:inventory_id]
      Inventory.where(id: params[:inventory_id])
    else
      raise ArgumentError 'The tool ID you entered in is not supported.'
    end
  end
end
