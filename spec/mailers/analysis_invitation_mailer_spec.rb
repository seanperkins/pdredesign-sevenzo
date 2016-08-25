require 'spec_helper'
require_relative './invitation_mailer_concern'

describe AnalysisInvitationMailer do
  it_behaves_like 'an invitation mailer' do
    let(:invitation) {
      create(:analysis_invitation)
    }

    let(:tool) {
      invitation.analysis
    }

    let(:tool_link) {
      "/#/inventories/#{tool.inventory.id}/analyses/#{tool.id}/invitations/#{invitation.token}"
    }

    let(:result) {
      AnalysisInvitationMailer.invite(invitation)
    }
  end
end
