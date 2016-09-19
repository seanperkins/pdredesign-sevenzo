class V1::ToolMembers < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :tool_member

  
end