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
          allow(AssessmentsMailer).to receive(:assigned).with(assessment, anything)
                                          .exactly(2).times
                                          .and_return assessments_mailer_double
          allow(assessments_mailer_double).to receive(:deliver_now).exactly(2).times

          all_participants_notification_worker.perform(assessment.id)
          assessment.participants.reload
        end

        it {
          expect(assessments_mailer_double).to receive(:deliver_now).exactly(2).times
        }

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

        let(:notifications_mailer_double) {
          double('notifications_mailer')
        }

        let!(:invitation) {
          create(:user_invitation, assessment: assessment, user: participant)
        }

        before(:each) do
          allow(NotificationsMailer).to receive(:invite).with(invitation).exactly(:once).and_return(notifications_mailer_double)
          allow(AssessmentsMailer).to receive(:assigned).with(assessment, anything)
                                          .exactly(:once)
                                          .and_return assessments_mailer_double
          allow(notifications_mailer_double).to receive(:deliver_now).exactly(:once)
          allow(assessments_mailer_double).to receive(:deliver_now).exactly(:once)

          all_participants_notification_worker.perform(assessment.id)
          assessment.participants.reload
        end

        it {
          expect(assessments_mailer_double).to receive(:deliver_now).exactly(:once)
        }

        it {
          expect(notifications_mailer_double).to receive(:deliver_now).exactly(:once)
        }

        it {
          expect(participant.updated_at).to_not be_nil
        }

      end
    end
  end

  it 'sends an email to each participant' do
    double = double("mailer")

    expect(AssessmentsMailer).to receive(:assigned)
                                     .with(anything, @participant)
                                     .and_return(double)

    expect(AssessmentsMailer).to receive(:assigned)
                                     .with(anything, @participant2)
                                     .and_return(double)

    expect(double).to receive(:deliver_now).twice
    subject.new.perform(assessment.id)
  end

  it 'updates the invited_at timestamp for each participant' do
    double = double("mailer").as_null_object
    allow(AssessmentsMailer).to receive(:assigned).and_return(double)

    @participant.update(invited_at: nil)
    @participant2.update(invited_at: nil)

    subject.new.perform(assessment.id)

    @participant.reload
    @participant2.reload

    expect(@participant.invited_at).not_to be_nil
    expect(@participant2.invited_at).not_to be_nil
  end

  it 'does not deliver to already invited users' do
    double = double("mailer").as_null_object

    @participant.update(invited_at: Time.now)

    expect(AssessmentsMailer).to receive(:assigned)
                                     .with(anything, @participant2)
                                     .and_return(double)

    expect(double).to receive(:deliver_now)

    subject.new.perform(assessment.id)
  end

  context 'with invite' do
    before do
      @invite = UserInvitation.create!(
          first_name: 'test',
          last_name: 'test',
          email: @participant.user.email,
          team_role: 'worker',
          token: 'token',
          user: @participant.user,
          assessment_id: assessment.id)

    end

    it 'sends an invitation email to invited participants' do
      double = double("mailer").as_null_object


      expect(NotificationsMailer).to receive(:invite)
                                         .with(@invite)
                                         .and_return(double)

      expect(double).to receive(:deliver_now)

      expect(AssessmentsMailer).to receive(:assigned)
                                       .with(anything, @participant2)
                                       .and_return(double)

      expect(double).to receive(:deliver_now)

      subject.new.perform(assessment.id)
    end
  end
end
