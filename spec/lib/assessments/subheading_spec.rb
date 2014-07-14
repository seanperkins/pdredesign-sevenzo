require 'spec_helper'

describe Assessments::Subheading do
  let(:subject) { Assessments::Subheading }

  describe '#execute' do
    before { create_magic_assessments }

    let(:assessment) { @assessment_with_participants }

    it 'returns facilitators for a network partners assessment' do 
      user = Application::create_sample_user
      user.update(role: :network_partner)

      subheading = subject.new(assessment, user).execute
      expect(subheading[:message]).to eq('Facilitated by:')
      expect(subheading[:members].count).to eq(2)
    end

    it 'returns invited by when user is participant' do
      subheading = subject.new(assessment, @user).execute
      expect(subheading[:message]).to eq('Invited by:')
      expect(subheading[:members].first).to eq(@facilitator2)
    end

    describe 'For Facilitators' do
      before { create_struct }

      it 'returns not yet submitted if assessment is not a consensus' do
        instance  = subject.new(assessment, @facilitator2)
        allow(instance).to receive(:consensus?).and_return(false)

        subheading = instance.execute

        expect(subheading[:message]).to eq('Not yet submitted:')
        expect(subheading[:members].count).to eq(2)
        expect(subheading[:members].first.is_a?(User)).to eq(true)
      end

      it 'returns viewed report if assessment is a consensus' do
        instance  = subject.new(assessment, @facilitator2)
        allow(instance).to receive(:consensus?).and_return(true)

        @participant.update(report_viewed_at: Time.now)
        subheading = instance.execute

        expect(subheading[:message]).to eq('Viewed report:')
        expect(subheading[:members].count).to eq(1)
        expect(subheading[:members].first.is_a?(User)).to eq(true)
      end
    end
  end

end
