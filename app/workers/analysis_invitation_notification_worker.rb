class AnalysisInvitationNotificationWorker
  include ::Sidekiq::Worker

  def perform(invite_id)
    invite = AnalysisInvitation.find(invite_id)
    AnalysisInvitationMailer.invite(invite).deliver_now

    member = AnalysisMember.where(user_id: invite.user_id, inventory_id: invite.inventory_id).first
    member.invited_at = Time.now
    member.save
  end
end
