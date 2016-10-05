class RemoveNonHybridParticipantToolMembers < ActiveRecord::Migration
  def change
    removable_participant_ids = ToolMember.with(tool_based_facilitators: ToolMember.select(:id, :tool_type, :tool_id, :user_id).where(role: ToolMember.member_roles[:facilitator])).joins('INNER JOIN tool_based_facilitators tbf ON tool_members.tool_id = tbf.tool_id AND tool_members.tool_type = tbf.tool_type AND tool_members.user_id = tbf.user_id').where(role: ToolMember.member_roles[:participant]).pluck(&:id)
    ToolMember.where(id: removable_participant_ids).delete_all
  end
end
