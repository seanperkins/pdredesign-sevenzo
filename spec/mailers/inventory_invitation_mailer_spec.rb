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

    let(:tool_link) {
      "/#/invitations/#{invitation.token}"
    }

    let(:result) {
      InventoryInvitationMailer.invite(invitation)
    }
  end
end
