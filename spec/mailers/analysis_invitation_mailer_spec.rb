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

    let(:result) {
      AnalysisInvitationMailer.invite(invitation)
    }
  end

  context '#invite' do
    let(:invitation) {
      create(:analysis_invitation)
    }

    let(:analysis) {
      invitation.analysis
    }

    let(:inventory) {
      analysis.inventory
    }

    let(:invitation_link) {
      "/#/inventories/#{inventory.id}/analyses/#{analysis.id}/invitations/#{invitation.token}"
    }

    let(:mail) {
      AnalysisInvitationMailer.invite(invitation.id)
    }

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
