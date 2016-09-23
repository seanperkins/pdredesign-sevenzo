require 'spec_helper'

describe AccessRequestNotificationWorker do

  context 'when no access request exists' do
    it {
      expect { subject.perform(0) }.to raise_error ActiveRecord::RecordNotFound
    }
  end

  context 'when an access request exists' do
    context 'when no facilitators are present' do
      let(:assessment) {
        create(:assessment, :with_owner)
      }

      let(:request) {
        create(:access_request, tool: assessment, roles: [:facilitator])
      }

      let(:mailer_double) {
        double('mailer')
      }

      it {
        expect(AccessRequestMailer).to receive(:request_access).with(request, assessment.user.email).and_return(mailer_double)
        expect(mailer_double).to receive(:deliver_now).once
        subject.perform(request.id)
      }
    end

    context 'when there is at least one facilitator present' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:request) {
        create(:access_request, tool: assessment, roles: [:facilitator])
      }

      let(:mailer_double) {
        double('mailer')
      }

      it {
        expect(AccessRequestMailer).to receive(:request_access).at_least(:once).and_return(mailer_double)
        expect(mailer_double).to receive(:deliver_now).exactly(assessment.facilitators.size + 1).times
        subject.perform(request.id)
      }
    end
  end
end
