require 'spec_helper'

describe InventoryAccessRequestNotificationWorker do
  context 'inventory with two facilitators' do
    let(:subject) { InventoryAccessRequestNotificationWorker }
    let(:inventory) { FactoryGirl.create(:inventory, :with_facilitators, facilitators: 2) }
    let(:request) { FactoryGirl.create(:inventory_access_request, :as_facilitator, inventory: inventory) }
    let(:first_facilitator) { inventory.facilitators.first.user }
    let(:second_facilitator) { inventory.facilitators.last.user }

    it 'sends an email to both facilitators' do
      double = double('mailer')
      expect(InventoryAccessRequestMailer).to receive(:request_access)
        .with(request, first_facilitator.email)
        .and_return(double)

      expect(InventoryAccessRequestMailer).to receive(:request_access)
        .with(request, second_facilitator.email)
        .and_return(double)

      expect(double).to receive(:deliver_now).twice
      subject.new.perform(request.id)
    end
  end
end
