require 'spec_helper'

describe AssessmentsMailer do
  describe '#assigned' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:participant) {
      assessment.participants.sample
    }

    it {
      expect(AssessmentsMailer.assigned(assessment, participant).to include participant.user.email)
    }

    it {
      expect(AssessmentsMailer.assigned(assessment, participant).html_part.body).to include("/\#/assessments/#{assessment.id}/responses")
    }

    it {
      expect(AssessmentsMailer.assigned(assessment, participant).text_part.body).to include("/\#/assessments/#{assessment.id}/responses")
    }
  end

  describe '#reminder' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:participant) {
      assessment.participants.sample
    }

    it {
      expect(AssessmentsMailer.reminder(assessment, 'reminder', participant).to).to include participant.user.email
    }

    it {
      expect(AssessmentsMailer.reminder(assessment, 'reminder', participant).body).to include "/\#/assessments/#{assessment.id}/responses"
    }
  end
end
