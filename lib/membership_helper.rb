module MembershipHelper
  def participant?(tool, user)
    ToolMember.exists?(tool: tool, user: user, role: ToolMember.member_roles[:participant])
  end

  def facilitator?(tool, user)
    ToolMember.exists?(tool: tool, user: user, role: ToolMember.member_roles[:facilitator])
  end

  def owner?(tool, user)
    tool.user == user
  end
end