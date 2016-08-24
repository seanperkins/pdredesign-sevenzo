require 'spec_helper'
require_relative './invitation_mailer_concern'

describe InventoryInvitationMailer do
  it_behaves_like 'an invitation mailer' do
    let(:invitation) {
      create(:inventory_invitation)
    }

    let(:tool) {
      invitation.inventory
    }

    let(:result) {
      InventoryInvitationMailer.invite(invitation)
    }
  end

  context '#invite' do
    let(:invitation) { FactoryGirl.create(:inventory_invitation)  }
    let(:invitation_link) { "/#/inventories/invitations/#{invitation.token}" }
    let(:mail) { InventoryInvitationMailer.invite(invitation.id) }

    it 'sends the invite mail to the user on invite' do
      expect(mail.to).to include(invitation.email)
    end

    context 'html' do
      it 'has the correct invite link' do
        expect(mail.html_part.body.to_s).to include(invitation_link)
      end
    end

    context 'text' do
      it 'has the correct invite link' do
        expect(mail.text_part.body.to_s).to include(invitation_link)
      end
    end
  end
end
