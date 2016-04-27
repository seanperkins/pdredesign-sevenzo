require 'spec_helper' 

describe AnalysisInvitationMailer do
  context '#invite' do
    let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }
    let(:invitation) { FactoryGirl.create(:analysis_invitation, analysis: inventory.analysis)  }
    let(:invitation_link) { "/#/inventories/#{inventory.id}/analysis/invitations/#{invitation.token}" }
    let(:mail) { AnalysisInvitationMailer.invite(invitation.id) }

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
