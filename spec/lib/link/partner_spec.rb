require 'spec_helper'

describe Link::Partner do
  let(:assessment) {
    create(:assessment, :with_participants)
  }

  let(:user) {
    create(:user, :with_district)
  }

  let(:link_partner) {
    Link::Partner.new(assessment, user)
  }

  context 'when user has no pending requests' do
    context 'when user is not a network partner' do
      before(:each) do
        allow(assessment).to receive(:pending_requests?).with(user).and_return false
        allow(assessment).to receive(:network_partner?).with(user).and_return false
      end

      it {
        expect(link_partner.execute).to eq({
                                               access: {title: 'Request Access', type: :request_access}
                                           })
      }
    end

    context 'when user is a network partner' do
      before(:each) do
        allow(assessment).to receive(:pending_requests?).with(user).and_return false
        allow(assessment).to receive(:network_partner?).with(user).and_return true
      end

      it {
        expect(link_partner.execute).to eq({
                                               access: nil
                                           })
      }
    end
  end

  context 'when user has pending requests' do
    before(:each) do
      allow(assessment).to receive(:pending_requests?).with(user).and_return true
    end

    it {
      expect(link_partner.execute).to eq({
                                             access: {title: 'Access Pending', type: :pending}
                                         })
    }
  end
end
