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
      # One additional facilitator exists since the assessment owner is also a facilitator
      # One extra facilitator comes by virtue of the access_request factory for a total of five
      expect(AccessRequestMailer).to receive(:request_access).exactly(5).times.and_return(mailer_double)
      expect(mailer_double).to receive(:deliver_now).exactly(5).times
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
      # One extra facilitator comes by virtue of the access_request factory for a total of five
      expect(InventoryAccessRequestMailer).to receive(:request_access).exactly(5).times.and_return(mailer_double)
      expect(mailer_double).to receive(:deliver_now).exactly(5).times
    end

    it {
      expect { subject.perform(access_request.id) }.to_not raise_error
    }
  end


  context 'when the tool is an analysis' do
    let(:access_request) {
      create(:access_request, :for_analysis)
    }

    let!(:facilitators) {
      create_list(:tool_member, 3, :as_facilitator, tool: access_request.tool)
    }

    let(:mailer_double) {
      double(AnalysisAccessRequestMailer)
    }

    before(:each) do
      # One additional facilitator exists since the analysis owner is also a facilitator
      # Two extra facilitators comes by virtue of the access_request factory for a total of six
      expect(AnalysisAccessRequestMailer).to receive(:request_access).exactly(6).times.and_return(mailer_double)
      expect(mailer_double).to receive(:deliver_now).exactly(6).times
    end

    it {
      expect { subject.perform(access_request.id) }.to_not raise_error
    }
  end
end