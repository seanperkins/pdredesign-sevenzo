require 'spec_helper'

describe InventoryAccessRequestNotificationWorker do
  context 'inventory with two facilitators' do
    let(:subject) {
      InventoryAccessRequestNotificationWorker
    }

    let!(:inventory) {
      create(:inventory, :with_facilitators, facilitators: 2)
    }

    let!(:request) {
      create(:access_request, :with_facilitator_role, tool: inventory)
    }

    let!(:all_facilitators) {
      inventory.facilitators.collect(&:user)
    }

    it 'sends an email to all facilitators' do
      double = double('mailer')
      expect(InventoryAccessRequestMailer).to receive(:request_access).at_least(:once).and_return(double)
      expect(double).to receive(:deliver_now).exactly(all_facilitators.count).times
      subject.new.perform(request.id)
    end
  end
end
