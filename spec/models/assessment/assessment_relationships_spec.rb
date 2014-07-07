require 'spec_helper'

describe Assessment do

  before { create_magic_assessments }
  let(:assessment) { @assessment_with_participants }

  describe 'facilitator' do 

    it 'can assign facilitators to an assessment' do
      first_facilitator  = Application::create_sample_user
      second_facilitator = Application::create_sample_user
  
      assessment.update(facilitators: [first_facilitator, second_facilitator])

      expect(assessment.facilitator_ids).to include(first_facilitator.id)
      expect(assessment.facilitator_ids).to include(second_facilitator.id)
    end

    context '#facilitator?' do
      it 'returns if a user is a facilitator for an assessment' do
        facilitator = Application::create_sample_user

        expect(assessment.facilitator?(facilitator)).to eq(false)

        assessment.update(facilitators: [facilitator])
        expect(assessment.facilitator?(facilitator)).to eq(true)
      end
    end
  end

end
