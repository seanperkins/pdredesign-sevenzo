require 'spec_helper'

describe ToolMemberAccessRequestNotificationWorker do
  context 'when the tool is an assessment' do
    let(:access_request) {
      create(:access_request, :for_assessment)
    }

    let!(:facilitators) {
      create_list(:tool_member, 3, :as_facilitator, tool: access_request.tool)
    }

    let(:mailer_double) {
      double(AccessRequestMailer)
    }

    before(:each) do
      expect(AccessRequestMailer).to receive(:request_access).exactly(3).times.and_return(mailer_double)
      expect(mailer_double).to receive(:deliver_now).exactly(3).times
    end

    it {
      expect { subject.perform(access_request.id) }.to_not raise_error
    }
  end

  context 'when the tool is an inventory' do
    let(:access_request) {
      create(:access_request, :for_inventory)
    }

    let!(:facilitators) {
      create_list(:tool_member, 3, :as_facilitator, tool: access_request.tool)
    }

    let(:mailer_double) {
      double(InventoryAccessRequestMailer)
    }

    before(:each) do
      # One additional facilitator exists since the inventory owner is also a facilitator
      expect(InventoryAccessRequestMailer).to receive(:request_access).exactly(4).times.and_return(mailer_double)
      expect(mailer_double).to receive(:deliver_now).exactly(4).times
    end

    it {
      expect { subject.perform(access_request.id) }.to_not raise_error
    }
  end
end