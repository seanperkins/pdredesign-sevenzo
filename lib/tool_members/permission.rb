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

    def set_and_notify_role(role)
      return unless ROLES.include? role

      tool_member = tool.tool_members.find_or_create_by(user: user)
      return if tool_member.roles.include?(MembershipHelper.dehumanize_role(role))

      tool_member.roles = [MembershipHelper.dehumanize_role(role)]
      tool_member.save!
      notify_user_for_access_granted(role: role)
      reset_member
      role
    end

    private
    ROLES = %w(facilitator participant)

    def tool_member
      @tool_member ||= ToolMember.where(tool: tool, user: user).first
    end

    def reset_member
      @tool_member = nil
    end

    def notify_user_for_access_granted(role)
      params = [tool.id, user.id, role]
      unless role == 'facilitator'
        case tool.class.to_s
          when 'Inventory'
            InventoryAccessGrantedNotificationWorker.send(:perform_async, *params)
          when 'Analysis'
            AnalysisAccessGrantedNotificationWorker.send(:perform_async, *params)
        end
      end
    end
  end
end
