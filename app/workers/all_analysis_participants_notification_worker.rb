class AllAnalysisParticipantsNotificationWorker
  include ::Sidekiq::Worker

  def perform(analysis_id)
    analysis = Analysis.find_by(id: analysis_id)
    analysis.participants.each do |participant|
      next if invited_participant?(participant)
      record = invite_record(analysis_id, participant)

      if record
        send_invitation_email(record)
      else
        send_analysis_mail(analysis, participant)
      end

      mark_invited(participant)
    end
  end

  private
  def mark_invited(participant)
    participant.update(invited_at: Time.now)
  end

  def send_invitation_email(invitation_record)
    AnalysisInvitationMailer
        .invite(invitation_record)
        .deliver_now
  end

  def send_analysis_mail(analysis, participant)
    AnalysisMailer
        .assigned(analysis, participant)
        .deliver_now
  end

  def invite_record(analysis_id, participant)
    AnalysisInvitation.find_by(analysis_id: analysis_id,
                                user_id: participant.user.id)
  end

  def invited_participant?(participant)
    participant.invited_at
  end
end
