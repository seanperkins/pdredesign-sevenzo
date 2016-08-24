require 'spec_helper'

describe AllParticipantsNotificationWorker do
  let(:all_participants_notification_worker) {
    AllParticipantsNotificationWorker.new
  }

  context 'when an assessment does not exist' do
    it {
      expect { all_participants_notification_worker.perform(0) }
          .to raise_error(ActiveRecord::RecordNotFound)
    }
  end

  context 'when an assessment exists' do
    context 'if all participants have been invited' do
      let(:assessment) {
        create(:assessment, :with_participants, invited: true)
      }

      it {
        expect(all_participants_notification_worker).not_to receive(:invite_record)
        expect(all_participants_notification_worker).not_to receive(:send_invitation_email)
        expect(all_participants_notification_worker).not_to receive(:send_assessment_mail)
        expect(all_participants_notification_worker).not_to receive(:mark_invited)
        all_participants_notification_worker.perform(assessment.id)
      }
    end

    context 'when no participants have been invited' do
      context 'when there is no invitation record for any participant' do
        let(:assessment) {
          create(:assessment, :with_participants)
        }

        let(:assessments_mailer_double) {
          double('assessments_mailer_double')
        }

        before(:each) do
          allow(AssessmentsMailer).to receive(:assigned)
                                          .at_least(:twice)
                                          .and_return assessments_mailer_double
          expect(assessments_mailer_double).to receive(:deliver_now).exactly(:twice)
          all_participants_notification_worker.perform(assessment.id)
          assessment.participants.reload
        end

        it {
          expect(assessment.participants.map(&:invited_at).all? { |value| !value.nil? }).to be true
        }
      end

      context 'when there is an invitation record for one participant' do
        let(:participant) {
          assessment.participants.sample.user
        }

        let(:assessment) {
          create(:assessment, :with_participants)
        }

        let(:assessments_mailer_double) {
          double('assessments_mailer')
        }

        let(:assessment_invitation_mailer_double) {
          double('assessment_invitation_mailer')
        }

        let!(:invitation) {
          create(:user_invitation, assessment: assessment, user: participant)
        }

        before(:each) do
          allow(AssessmentInvitationMailer).to receive(:invite).with(invitation).exactly(:once).and_return(assessment_invitation_mailer_double)
          allow(AssessmentsMailer).to receive(:assigned).with(assessment, anything)
                                          .exactly(:once)
                                          .and_return assessments_mailer_double

          expect(assessments_mailer_double).to receive(:deliver_now).exactly(:once)
          expect(assessment_invitation_mailer_double).to receive(:deliver_now).exactly(:once)

          all_participants_notification_worker.perform(assessment.id)
          assessment.participants.reload
        end

        it {
          expect(participant.updated_at).to_not be_nil
        }

      end

      context 'when there is an invitation record for all participants' do
        let(:participant) {
          assessment.participants.sample.user
        }

        let(:assessment) {
          create(:assessment, :with_participants)
        }

        let(:assessments_mailer_double) {
          double('assessments_mailer')
        }

        let(:assessment_invitation_mailer_double) {
          double('assessment_invitation_mailer')
        }

        let!(:invitations) {
          assessment.participants.each { |participant|
            create(:user_invitation, assessment: assessment, user: participant.user)
          }
        }

        before(:each) do
          allow(AssessmentInvitationMailer).to receive(:invite).exactly(:twice).and_return(assessment_invitation_mailer_double)

          expect(assessment_invitation_mailer_double).to receive(:deliver_now).exactly(:twice)

          all_participants_notification_worker.perform(assessment.id)
          assessment.participants.reload
        end

        it {
          expect(assessment.participants.map(&:invited_at).all? { |value| !value.nil? }).to be true
        }
      end
    end
  end
end
