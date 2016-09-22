class ConvertLegacyFacilitatorsToParticipants < ActiveRecord::Migration
  def change
    ToolMember
        .where(tool_type: 'Assessment',
                     role: ToolMember.member_roles[:facilitator])
        .where.not(user_id: ToolMember.where(tool_type: 'Assessment',
                                             role: ToolMember.member_roles[:participant]).select(:user_id))
        .each { |tool_member|
      ToolMember.create!(user: tool_member.user, tool: tool_member.tool, role: ToolMember.member_roles[:participant])
    }
  end
end
