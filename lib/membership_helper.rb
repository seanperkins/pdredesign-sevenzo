module MembershipHelper
  def self.participant?(tool, user)
    ToolMember.where(tool: tool, user: user, role: ToolMember.member_roles[:participant]).exists?
  end

  def self.facilitator?(tool, user)
    ToolMember.where(tool: tool, user: user, role: ToolMember.member_roles[:facilitator]).exists?
  end

  def self.status(tool_member)
    return :pending if tool_member.invited_at.nil?
    return :invited if tool_member.response.nil?
    return :in_progress if tool_member.response.submitted_at.nil?
    :completed
  end

  def self.date(tool_member, status)
    return tool_member.tool.updated_at if status == :pending
    return tool_member.invited_at if status == :invited
    return tool_member.response.updated_at if status == :in_progress
    tool_member.response.submitted_at
  end
end
