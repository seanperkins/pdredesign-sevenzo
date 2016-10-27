require 'spec_helper'

describe UserInvitationNotificationWorker do

  describe '#perform' do
    let(:user_invitation_notification_worker) {
      UserInvitationNotificationWorker.new
    }

    context 'when an invite cannot be found' do
      it {
        expect { user_invitation_notification_worker.perform(0) }
        .to raise_error(ActiveRecord::RecordNotFound)
      }
    end

    context 'when an invite exists' do
      let(:user_invitation) {
        create(:user_invitation, :with_associated_assessment_participant)
      }

      let(:participant) {
        ToolMember.find_by(user: user_invitation.user)
      }

      let(:assessment_invitation_mailer_double) {
        double('NotificationsMailer')
      }

      before(:each) do
        expect(AssessmentInvitationMailer).to receive(:invite).with(user_invitation).and_return(assessment_invitation_mailer_double)
        expect(assessment_invitation_mailer_double).to receive(:deliver_now)
        user_invitation_notification_worker.perform(user_invitation.id)
        participant.reload
      end

      it {
        expect(participant.invited_at).to_not be_nil
      }
    end
  end
end
