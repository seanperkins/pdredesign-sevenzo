module MembershipHelper
  def self.participant?(tool, user)
    ToolMember.where(tool: tool, user: user, role: ToolMember.member_roles[:participant]).exists?
  end

  def self.facilitator?(tool, user)
    ToolMember.where(tool: tool, user: user, role: ToolMember.member_roles[:facilitator]).exists?
  end
end
