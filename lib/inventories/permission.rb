module Inventories
  class Permission
    PERMISSIONS = [:facilitator, :participant]

    attr_reader :inventory
    attr_reader :user

    def initialize(inventory:, user:)
      @inventory = inventory
      @user = user
    end

    def possible_roles_permissions
      PERMISSIONS-[get_level(user)]
    end

    def role
      participant.try(:role)
    end

    def role=(role)
      return unless PERMISSIONS.include? role.to_sym

      member = inventory.members.find_or_create_by(user: user)
      return if member.role == role

      member.role = role
      member.save!
      notify_user_for_access_granted(role: role)
      participant.reload.role
    end

    def access_request
      inventory.access_requests.where(user: user).first
    end

    def accept
      request = access_request
      return false unless request
      self.role = request.role
      request.destroy!
    end

    def deny
      ar = get_access_request(user)
      ar.destroy
    end

    def revoke_level(user)
      case get_level(user)
        when :facilitator
          assessment.facilitators.delete(user)
        when :viewer
          assessment.viewers.destroy(user)
        when :network_partner
          assessment.network_partners.destroy(user)
          assessment.reload
      end
    end

    def self.available_permissions
      PERMISSIONS
    end

    def self.request_access(user:, assessment_id:, roles:)
      roles = roles.is_a?(String) ? [roles] : roles

      return AccessRequest.create(
          {
              roles: roles, token: SecureRandom.hex[0..9],
              user: user, assessment_id: assessment_id
          })
    end

    private
    def participant
      @participant ||= inventory.members.where(user: user).first
    end

    ROLES_TO_NOT_SEND_GRANTED_NOTIFICATION = [:participant]

    def grant_access(record)
      record.roles.each do |role|
        send("grant_#{role}", assessment, record.user)
      end
      record.destroy
      true
    end

    def notify_user_for_access_granted(role:)
      return if ROLES_TO_NOT_SEND_GRANTED_NOTIFICATION.include? role.to_sym
      InventoryAccessGrantedNotificationWorker.perform_async(inventory.id, user.id, role) 
    end
  end
end
