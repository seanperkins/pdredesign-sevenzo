require 'spec_helper'

describe ReminderNotificationWorker do
  let(:reminder_notification_worker) {
    ReminderNotificationWorker.new
  }

  describe '#perform' do
    context 'when type is Assessment' do
      let(:type) {
        'Assessment'
      }

      it {
        expect(reminder_notification_worker).to receive(:perform_for_assessment)
        reminder_notification_worker.perform(0, type, nil)
      }
    end

    context 'when type is Inventory' do
      let(:type) {
        'Inventory'
      }

      it {
        expect(reminder_notification_worker).to receive(:perform_for_inventory)
        reminder_notification_worker.perform(0, type, nil)
      }
    end


    context 'when type is Analysis' do
      let(:type) {
        'Analysis'
      }

      it {
        expect(reminder_notification_worker).to receive(:perform_for_analysis)
        reminder_notification_worker.perform(0, type, nil)
      }
    end
  end

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

        before(:each) do
          expect(AssessmentsMailer).not_to receive(:reminder)
          reminder_notification_worker.perform_for_assessment(assessment_id: assessment.id, message: nil)
        end

        it {
          expect(Message.where(tool: assessment, content: nil, category: :reminder)).to_not be_empty
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

          before(:each) do
            expect(AssessmentsMailer).to receive(:reminder).exactly(:twice).and_return(assessments_mailer_double)
            expect(assessments_mailer_double).to receive(:deliver_now).exactly(:twice)
            reminder_notification_worker.perform_for_assessment(assessment_id: assessment.id, message: nil)
            assessment.participants.reload

          end

          it {
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

          before(:each) do
            expect(AssessmentsMailer).to receive(:reminder).exactly(:twice).and_return(assessments_mailer_double)
            expect(assessments_mailer_double).to receive(:deliver_now).exactly(:twice)
            reminder_notification_worker.perform_for_assessment(assessment_id: assessment.id, message: nil)
            assessment.participants.reload
          end

          it {
            expect(assessment.participants.all? { |participant| !participant.reminded_at.nil? })
          }
        end
      end
    end
  end

  describe '#perform_for_inventory' do
    context 'when the inventory does not exist' do
      it {
        expect { reminder_notification_worker.perform_for_inventory(inventory_id: 0, message: nil) }
            .to raise_error(ActiveRecord::RecordNotFound)
      }
    end

    context 'when an inventory exists' do
      context 'when no participants are present' do
        let(:inventory) {
          create(:inventory)
        }

        before(:each) do
          expect(InventoryInvitationMailer).not_to receive(:reminder)
          reminder_notification_worker.perform_for_inventory(inventory_id: inventory.id, message: nil)
        end

        it {
          expect(Message.where(tool: inventory, content: nil, category: :reminder)).to_not be_empty
        }
      end

      context 'when participants are present' do
        let(:inventory) {
          create(:inventory, :with_participants, participants: 2)
        }

        let(:inventory_invitation_mailer_double) {
          double('InventoryInvitationMailer')
        }

       before(:each) do
         expect(InventoryInvitationMailer).to receive(:reminder).exactly(:twice).and_return(inventory_invitation_mailer_double)
         expect(inventory_invitation_mailer_double).to receive(:deliver_now).exactly(:twice)
         reminder_notification_worker.perform_for_inventory(inventory_id: inventory.id, message: nil)
         inventory.participants.reload
       end

        it {
          expect(inventory.participants.all? { |participant| !participant.reminded_at.nil? })
        }
      end
    end
  end

  describe '#perform_for_analysis' do
    context 'when the analysis does not exist' do
      it {
        expect { reminder_notification_worker.perform_for_analysis(analysis_id: 0, message: nil) }
            .to raise_error(ActiveRecord::RecordNotFound)
      }
    end

    context 'when an analysis exists' do
      context 'when no participants are present' do
        let(:analysis) {
          create(:analysis)
        }

        before(:each) do
          expect(AnalysisInvitationMailer).not_to receive(:reminder)
          reminder_notification_worker.perform_for_analysis(analysis_id: analysis.id, message: nil)
        end

        it {
          expect(Message.where(tool: analysis, content: nil, category: :reminder)).to_not be_empty
        }
      end

      context 'when participants are present' do
        let(:analysis) {
          create(:analysis, :with_participants, participants: 2)
        }

        let(:analysis_invitation_mailer_double) {
          double('AnalysisInvitationMailer')
        }

        before(:each) do
          expect(AnalysisInvitationMailer).to receive(:reminder).exactly(:twice).and_return(analysis_invitation_mailer_double)
          expect(analysis_invitation_mailer_double).to receive(:deliver_now).exactly(:twice)
          reminder_notification_worker.perform_for_analysis(analysis_id: analysis.id, message: nil)
          analysis.participants.reload
        end

        it {
          expect(analysis.participants.all? { |participant| !participant.reminded_at.nil? })
        }
      end
    end
  end
end
