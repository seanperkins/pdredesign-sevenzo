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

    def requested
      AccessRequest.where(assessment_id: assessment.id)
    end

    def get_access_request(user)
      AccessRequest.find_by(assessment_id: assessment.id, user_id: user.id)
    end

    def get_level(user)
      case
        when assessment.facilitator?(user)
          :facilitator
        when assessment.participant?(user)
          :participant
      end
    end

    def add_level(level)
      level = level.to_sym
      return unless PERMISSIONS.include? level

      member = inventory.members.find_or_create_by(user: user)
      member.role = level
      member.save!
      notify_user_for_access_granted(level: level)
      true
    end

    def update_level(user, level)
      unless assessment.owner?(user)
        unless get_level(user).to_s == level.to_s
          revoke_level(user)
          add_level(user, level)
        end
      end
    end

    def accept_permission_requested(user)
      ar = get_access_request(user)
      grant_access(ar)
      notify_user_for_access_granted(ar.assessment, ar.user, ar.roles.first)
    end

    def deny(user)
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
    ROLES_TO_NOT_SEND_GRANTED_NOTIFICATION = [:participant]

    def grant_access(record)
      record.roles.each do |role|
        send("grant_#{role}", assessment, record.user)
      end
      record.destroy
      true
    end

    def notify_user_for_access_granted(level:)
      return if ROLES_TO_NOT_SEND_GRANTED_NOTIFICATION.include? level.to_sym
      InventoryAccessGrantedNotificationWorker.perform_async(inventory.id, user.id, level) 
    end
  end
end
