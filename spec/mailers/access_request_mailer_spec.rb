require 'spec_helper'

describe AccessRequestMailer do
  describe '#request_access' do
    let(:access_request) {
      create(:access_request, token: 'expected_token')
    }

    it {
      expect(AccessRequestMailer.request_access(access_request, 'test@example.com').to).to include 'test@example.com'
    }

    it {
      expect(AccessRequestMailer.request_access(access_request, 'test@example.com').body).to include '/#/grant/expected_token'
    }
  end
end
