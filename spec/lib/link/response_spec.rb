require 'spec_helper'

describe Link::Response do
  before           { create_magic_assessments }
  before           { create_responses }
  let(:assessment) { @assessment_with_participants }
  let(:subject)    { Link::Response }

  describe '#assessment_link' do

    before do
      assessment.update(assigned_at: Time.now)
    end

    def link_for(user)
      subject.new(assessment, user).execute
    end

    it 'returns :consensus when status is consensus and is submitted' do
      Response.first.update(submitted_at: Time.now)
      assessment.update(response: Response.first)

      expect(link_for(@user)).to eq(:consensus)
    end

    it 'returns :new_response when no response for the participant' do
      @participant.response.delete
      expect(link_for(@participant.user)).to eq(:new_response)
    end

    it 'returns :none when a user is not a participant' do
      new_user = Application::create_sample_user
      expect(link_for(new_user)).to eq(:none)
    end

    it 'returns new_response when there is no response for the user' do
      expect(link_for(@participant.user)).to eq(:response)
    end

    it 'returns none when the assessment is not assigned' do
      assessment.update(assigned_at: nil)

      expect(link_for(@participant.user)).to eq(:none)
    end

  end

end
