require 'active_support/concern'

module ToolOwnerMembershipConcern
  extend ActiveSupport::Concern

  included do
    after_save :add_owner_as_tool_facilitator
  end

  def add_owner_as_tool_facilitator
    facilitator = self.facilitators.find_or_create_by(user: self.owner)
    if facilitator.new_record?
      facilitator.roles << ToolMember.member_roles[:facilitator]
      facilitator.save
    end
  end
end