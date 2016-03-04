module Inventories
  class MemberFromInvite
    attr_reader :invite

    def initialize(invite)
      @invite = invite
    end

    def execute
      user = create_or_update_user
      update_user_id(user)
      create_member
      set_permission
    end

    private
    def update_user_id(user)
      invite.user_id = user.id
      invite.save
    end

    def create_member
      InventoryMember.find_or_create_by(
        inventory_id: invite.inventory_id,
        user_id:       user_found.id)
    end

    def create_or_update_user
      if user_found
        update_user(user_found)
      else
        create_user
      end
    end

    def update_user(user)
      add_district_to_user(user)
      user.update_column(:team_role, invite.team_role)
      return user
    end

    def add_district_to_user(user)
      return if district_member?(user)
      user.tap do
        user.districts << invite.inventory.district 
        user.save
      end
    end

    def district_member?(user)
      user.district_ids.include?(invite.inventory.district_id)
    end

    def create_user
      User.create!(first_name:   invite.first_name,
                   last_name:    invite.last_name,
                   email:        invite.email,
                   password:     generate_password,
                   team_role:    invite.team_role,
                   district_ids: invite.inventory.district_id)
    end

    def user_found
      @user_found = User.find_by(email: invite.email)
    end

    def generate_password
      SecureRandom.hex[0..9]
    end

    def set_permission
      invite.role = 'facilitator' if invite.user.network_partner?
      return unless invite.role
      ap = Inventories::Permission.new(inventory: invite.inventory, user: invite.user)
      ap.add_level(invite.role)
    end
  end
end
