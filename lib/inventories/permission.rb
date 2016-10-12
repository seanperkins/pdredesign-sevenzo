module Inventories
  class Permission
    attr_reader :inventory
    attr_reader :user

    def initialize(inventory:, user:)
      @inventory = inventory
      @user = user
    end

    def role
      MembershipHelper.humanize_roles(member.try(:roles))
    end

    def role=(role)
      return unless ROLES.include? role

      member = inventory.tool_members.find_or_create_by(user: user)
      return if member.roles.include?(MembershipHelper.dehumanize_role(role))

      member.roles = [MembershipHelper.dehumanize_role(role)]
      member.save!
      notify_user_for_access_granted(role: role)
      reset_member
      role
    end

    def available_roles
      ROLES-[role]
    end

    private
    ROLES = %w(facilitator participant)

    def member
      @participant ||= inventory.tool_members.where(user: user).first
    end

    def reset_member
      @participant = nil
    end

    ROLES_TO_NOT_SEND_GRANTED_NOTIFICATION = [:participant]

    def notify_user_for_access_granted(role:)
      return if ROLES_TO_NOT_SEND_GRANTED_NOTIFICATION.include? role.to_sym
      InventoryAccessGrantedNotificationWorker.perform_async(inventory.id, user.id, role)
    end
  end
end
