class AnalysisInvitationNotificationWorker
  include ::Sidekiq::Worker

  def perform(invite_id)
    invite = AnalysisInvitation.find(invite_id)
    AnalysisInvitationMailer.invite(invite).deliver_now

    member = ToolMember.where(user_id: invite.user_id, tool_type: 'Analysis', tool_id: invite.analysis_id).first
    member.invited_at = Time.now
    member.save
  end
end
