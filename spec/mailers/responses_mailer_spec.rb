require 'spec_helper' 

describe ResponsesMailer do
  describe '#submitted' do

    let(:response) {
      create(:response, :as_assessment_participant_responder)
    }

    let!(:participant) {
      p = response.responder
      p.assessment = assessment
      p.user = p.assessment.user
      p
    }

    let(:assessment) {
      create(:assessment, :with_participants)
    }

    it {
      expect(ResponsesMailer.submitted(response).to).to include participant.user.email
    }

    it {
      expect(ResponsesMailer.submitted(response).body).to include "/\#/assessments/#{assessment.id}/dashboard"
    }
  end
end
