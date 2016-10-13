require 'spec_helper'

describe InventoryAccessRequestMailer do
  describe '#request_access' do
    let(:inventory) {
      access_request.tool
    }

    let(:access_request) {
      create(:access_request, :with_facilitator_role, :for_inventory)
    }

    it 'sends the email to the correct email' do
      mail = InventoryAccessRequestMailer.request_access(access_request, 'test@example.com')
      expect(mail.to).to include('test@example.com')
    end

    it 'containers the correct link' do
      mail = InventoryAccessRequestMailer.request_access(access_request, 'test@example.com')
      expect(mail.body).to include "/#/inventories/#{inventory.id}/dashboard"
    end
  end
end
