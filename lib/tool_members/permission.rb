module ToolMembers
  class Permission
    attr_reader :tool, :user

    def initialize(tool, user)
      @tool = tool
      @user = user
    end

    def roles
      tool_member ? MembershipHelper.humanize_roles(tool_member.roles) : ['None']
    end

    private
    def tool_member
      @tool_member ||= ToolMember.where(tool: tool, user: user).first
    end
  end
end
