class MigrateRoleDataFromFieldToArray < ActiveRecord::Migration
  def change
    # Add facilitator and participant roles
    ToolMember.where(role: ToolMember.member_roles[:facilitator]).update_all(roles: [ToolMember.member_roles[:facilitator]])
    ToolMember.where(role: ToolMember.member_roles[:participant]).update_all(roles: [ToolMember.member_roles[:participant]])

    # Update each tool member facilitator which is also a participant in their respective tool
    ToolMember.with(tool_based_participants: ToolMember.select(:tool_type, :tool_id, :user_id)
                                                 .where(role: ToolMember.member_roles[:participant]))
        .joins('inner join tool_based_participants tbp ON tool_members.tool_id = tbp.tool_id AND tool_members.tool_type = tbp.tool_type AND tool_members.user_id = tbp.user_id')
        .where(role: ToolMember.member_roles[:facilitator]).each { |tool_member|
      tool_member.roles << ToolMember.member_roles[:participant]
      tool_member.save!
    }

    # Migrate over the responses for these facilitators
    ToolMember.with(tool_based_facilitators: ToolMember.select(:tool_type, :tool_id, :user_id)
                                                 .where(role: ToolMember.member_roles[:facilitator]))
        .joins('inner join tool_based_facilitators tbf ON tool_members.tool_id = tbf.tool_id AND tool_members.tool_type = tbf.tool_type AND tool_members.user_id = tbf.user_id')
        .where(role: ToolMember.member_roles[:participant])
        .where.not(response_id: nil).each { |tool_member|
      facilitator = ToolMember.where(tool_id: tool_member.tool_id,
                       user_id: tool_member.user_id,
                       tool_type: tool_member.tool_type,
                       role: ToolMember.member_roles[:facilitator]).first
      facilitator.response_id = tool_member.response_id
      Response.find_by(id: tool_member.response_id).update_attributes(responder: facilitator)
      facilitator.save!
    }
  end
end
