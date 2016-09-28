require 'active_support/concern'

module ToolOwnerMembershipConcern
  extend ActiveSupport::Concern

  included do
    after_save :add_owner_as_tool_facilitator
  end

  def add_owner_as_tool_facilitator
    facilitator = ToolMember.find_or_create_by(user: self.owner,
                                 tool: self,
                                 role: ToolMember.member_roles[:facilitator])
    facilitator.save
  end
end