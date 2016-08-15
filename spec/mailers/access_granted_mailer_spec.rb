require 'spec_helper'

describe AccessGrantedMailer do
  describe '#notify' do

    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:participant) {
      assessment.participants.sample.user
    }

    it {
      expect(AccessGrantedMailer.notify(assessment, participant, 'facilitator').to).to include participant.email
    }

    it {
      expect(AccessGrantedMailer.notify(assessment, participant, 'facilitator').body).to include 'facilitator'
    }

  end
end
