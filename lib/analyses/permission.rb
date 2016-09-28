module Analyses
  class Permission
    attr_reader :analysis
    attr_reader :user

    def initialize(analysis:, user:)
      @analysis = analysis
      @user = user
    end

    def role
      member.try(:role)
    end

    def role=(role)
      return unless ROLES.include? role

      member = analysis.tool_members.find_or_create_by(user: user)
      return if member.role == ToolMember.member_roles[role]

      member.role = MembershipHelper.dehumanize_role(role)
      member.save!
      notify_user_for_access_granted(role: role)
      reset_member
      role
    end

    def revoke
      membership = member
      membership.destroy!
      reset_member
    end

    def available_roles
      ROLES-[role]
    end

    private
    ROLES = ['facilitator', 'participant']

    def member
      @participant ||= analysis.members.where(user: user).first
    end

    def reset_member
      @participant = nil
    end

    ROLES_TO_NOT_SEND_GRANTED_NOTIFICATION = [:participant]

    def notify_user_for_access_granted(role:)
      return if ROLES_TO_NOT_SEND_GRANTED_NOTIFICATION.include? role.to_sym
      AnalysisAccessGrantedNotificationWorker.perform_async(analysis.id, user.id, role) 
    end
  end
end
