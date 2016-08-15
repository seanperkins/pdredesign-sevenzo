require 'spec_helper'

describe AccessGrantedNotificationWorker do

  describe '#perform' do
    context 'with an assessment and user' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:mailer_double) {
        double('mailer')
      }

      let(:user) {
        create(:user)
      }


      before(:each) do
        expect(AccessGrantedMailer).to receive(:notify)
                                           .with(assessment, user, 'facilitator')
                                           .and_return(mailer_double)
        expect(mailer_double).to receive(:deliver_now)
      end

      it {
        expect { subject.perform(assessment.id, user.id, 'facilitator') }.not_to raise_error
      }
    end
  end

  context 'without an assessment' do
    let(:mailer_double) {
      double('mailer')
    }

    let(:user) {
      create(:user)
    }

    before(:each) do
      expect(AccessGrantedMailer).not_to receive(:notify)
                                         .with(nil, user, 'facilitator')
      expect(mailer_double).not_to receive(:deliver_now)
    end

    it {
      expect { subject.perform(nil, user.id, 'facilitator') }.to raise_error(ActiveRecord::RecordNotFound)
    }
  end

  context 'without a user' do
    let(:mailer_double) {
      double('mailer')
    }

    let(:assessment) {
      create(:assessment, :with_participants)
    }

    before(:each) do
      expect(AccessGrantedMailer).not_to receive(:notify)
                                             .with(assessment, nil, 'facilitator')
      expect(mailer_double).not_to receive(:deliver_now)
    end

    it {
      expect { subject.perform(assessment.id, nil, 'facilitator') }.to raise_error(ActiveRecord::RecordNotFound)
    }
  end
end
