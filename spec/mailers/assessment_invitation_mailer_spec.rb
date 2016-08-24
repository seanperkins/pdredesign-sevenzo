require 'spec_helper'
require_relative './invitation_mailer_concern'

describe AssessmentInvitationMailer do
  it_behaves_like 'an invitation mailer' do
    let(:invitation) {
      create(:user_invitation, user: create(:user, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name))
    }

    let(:tool) {
      invitation.assessment
    }

    let(:result) {
      AssessmentInvitationMailer.invite(invitation)
    }
  end
end