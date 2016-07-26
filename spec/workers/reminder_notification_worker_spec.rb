require 'spec_helper'

describe ReminderNotificationWorker do
  let(:reminder_notification_worker) {
    ReminderNotificationWorker.new
  }

  describe '#perform_for_assessment' do
    context 'when the assessment does not exist' do
      it {
        expect { reminder_notification_worker.perform_for_assessment(assessment_id: 0, message: nil) }
            .to raise_error(ActiveRecord::RecordNotFound)
      }
    end

    context 'when an assessment exists' do
      context 'when no participants are present' do
        let(:assessment) {
          create(:assessment)
        }

        it {
          expect(AssessmentsMailer).not_to receive(:reminder)
          reminder_notification_worker.perform_for_assessment(assessment_id: assessment.id, message: nil)
        }
      end

      context 'when participants are present' do
        context 'when all participants have responded and completed the assessment' do
          let(:assessment) {
            create(:assessment, :with_participants)
          }

          let!(:responses) {
            assessment.participants.each { |participant|
              participant.response = create(:response, :as_assessment_response, :submitted, assessment: assessment)
            }
          }

          it {
            expect(AssessmentsMailer).not_to receive(:reminder)
            reminder_notification_worker.perform_for_assessment(assessment_id: assessment.id, message: nil)
          }
        end

        context 'when all participants have responded to the assessment' do
          let(:assessment) {
            create(:assessment, :with_participants)
          }

          let(:assessments_mailer_double) {
            double('AssessmentsMailer')
          }

          let!(:responses) {
            assessment.participants.each { |participant|
              participant.response = create(:response, :as_assessment_response, assessment: assessment)
            }
          }

          it {
            expect(AssessmentsMailer).to receive(:reminder).exactly(:twice).and_return(assessments_mailer_double)
            expect(assessments_mailer_double).to receive(:deliver_now).exactly(:twice)
            reminder_notification_worker.perform_for_assessment(assessment_id: assessment.id, message: nil)
          }

          it {
            expect(AssessmentsMailer).to receive(:reminder).exactly(:twice).and_return(assessments_mailer_double)
            expect(assessments_mailer_double).to receive(:deliver_now).exactly(:twice)
            reminder_notification_worker.perform_for_assessment(assessment_id: assessment.id, message: nil)
            assessment.participants.reload

            expect(assessment.participants.all? { |participant| !participant.reminded_at.nil? })
          }
        end

        context 'when no participants have responded to the assessment' do
          let(:assessment) {
            create(:assessment, :with_participants)
          }

          let(:assessments_mailer_double) {
            double('AssessmentsMailer')
          }

          it {
            expect(AssessmentsMailer).to receive(:reminder).exactly(:twice).and_return(assessments_mailer_double)
            expect(assessments_mailer_double).to receive(:deliver_now).exactly(:twice)
            reminder_notification_worker.perform_for_assessment(assessment_id: assessment.id, message: nil)
          }

          it {
            expect(AssessmentsMailer).to receive(:reminder).exactly(:twice).and_return(assessments_mailer_double)
            expect(assessments_mailer_double).to receive(:deliver_now).exactly(:twice)
            reminder_notification_worker.perform_for_assessment(assessment_id: assessment.id, message: nil)
            assessment.participants.reload

            expect(assessment.participants.all? { |participant| !participant.reminded_at.nil? })
          }
        end
      end
    end
  end
end
