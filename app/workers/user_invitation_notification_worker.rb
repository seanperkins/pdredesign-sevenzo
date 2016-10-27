class UserInvitationNotificationWorker
  include ::Sidekiq::Worker

  def perform(invite_id)
    invite = find_invite(invite_id)
    AssessmentInvitationMailer.invite(invite).deliver_now

    participant = find_participant(invite)
    participant.update(invited_at: Time.now)
  end

  private
  def find_participant(invite)
    ToolMember.find_by(user: invite.user, tool: invite.assessment)
  end

  def find_invite(invite_id)
    UserInvitation.find(invite_id)
  end
end
