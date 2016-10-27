require 'spec_helper' 

describe ResponsesMailer do
  describe '#submitted' do

    let(:response) {
      create(:response, :as_assessment_participant_responder)
    }

    let!(:tool_member) {
      tool_member = response.responder
      tool_member.tool = assessment
      tool_member.user = tool_member.tool.user
      tool_member
    }

    let(:assessment) {
      create(:assessment, :with_participants)
    }

    it {
      expect(ResponsesMailer.submitted(response).to).to include tool_member.user.email
    }

    it {
      expect(ResponsesMailer.submitted(response).body).to include "/\#/assessments/#{assessment.id}/dashboard"
    }
  end
end
