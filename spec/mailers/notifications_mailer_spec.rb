require 'spec_helper'

describe AssessmentInvitationMailer do
  describe '#invite' do
    context 'when an invitation exists' do

      let(:user_invitation) {
        create(:user_invitation, token: 'expected-token')
      }

      it {
        expect(AssessmentInvitationMailer.invite(user_invitation.id).to).to include user_invitation.email
      }

      it {
        expect(AssessmentInvitationMailer.invite(user_invitation.id).html_part.body.to_s).to include('/#/invitations/expected-token')
      }

      it {
        expect(AssessmentInvitationMailer.invite(user_invitation.id).text_part.body.to_s).to include('/#/invitations/expected-token')
      }
    end
  end
end
