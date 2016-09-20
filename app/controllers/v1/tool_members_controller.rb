class V1::ToolMembersController < ApplicationController
  before_action :authenticate_user!

  def create
    tool_member = ToolMember.create(tool_member_params)
    authorize_action_for tool_member
    if tool_member.save
      render nothing: true, status: :created
    else
      @errors = tool_member.errors
      render 'v1/shared/errors', errors: @errors, status: :bad_request
    end
  end

  def show
    @tool_members = ToolMember.eager_load(:user, :response).where(tool_id: params[:tool_id], tool_type: params[:tool_type])
  end

  private
  def tool_member_params
    params.require(:tool_member).permit(:tool_type, :tool_id, :role, :user_id)
  end
end