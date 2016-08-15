require 'spec_helper'

describe ResponseCompletedNotificationWorker do

  describe '#perform' do

    let(:response_completed_notification_worker) {
      ResponseCompletedNotificationWorker.new
    }

    context 'when no response exists' do
      it {
        expect { response_completed_notification_worker.perform(0) }
            .to raise_error(ActiveRecord::RecordNotFound)
      }
    end

    context 'when the response exists' do
      let(:response) {
        create(:response)
      }

      let(:responses_mailer_double) {
        double(ResponsesMailer)
      }

      it {
        expect(ResponsesMailer).to receive(:submitted).with(response).and_return responses_mailer_double
        expect(responses_mailer_double).to receive(:deliver_now)
        response_completed_notification_worker.perform(response.id)
      }
    end
  end
end
