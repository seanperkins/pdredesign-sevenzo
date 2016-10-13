require 'spec_helper'

describe AnalysisAccessRequestMailer do
  describe '#request_access' do
    let(:analysis) {
      access_request.tool
    }

    let(:access_request) {
      create(:access_request, :with_facilitator_role, :for_analysis)
    }

    it 'sends the email to the correct email' do
      mail = AnalysisAccessRequestMailer.request_access(access_request, 'test@example.com')
      expect(mail.to).to include('test@example.com')
    end

    it 'containers the correct link' do
      mail = AnalysisAccessRequestMailer.request_access(access_request, 'test@example.com')
      expect(mail.body).to include "/#/inventories/#{analysis.inventory.id}/analyses/#{analysis.id}/dashboard"
    end
  end
end
