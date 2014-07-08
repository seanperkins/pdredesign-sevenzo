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

  describe 'network partner' do 

    it 'can assign network partners to an assessment' do
      first  = Application::create_sample_user
      second = Application::create_sample_user
  
      assessment.update(network_partners: [first, second])

      expect(assessment.network_partner_ids).to include(first.id)
      expect(assessment.network_partner_ids).to include(second.id)
    end

    context '#network_partner?' do
      it 'returns if a user is a facilitator for an assessment' do
        partner = Application::create_sample_user

        expect(assessment.network_partner?(partner)).to eq(false)

        assessment.update(network_partners: [partner])
        expect(assessment.network_partner?(partner)).to eq(true)
      end
    end
  end

  describe 'viewers' do

    it 'can assign facilitators to an assessment' do
      first_viewer  = Application::create_sample_user
      second_viewer = Application::create_sample_user
  
      assessment.update(viewers: [first_viewer, second_viewer])

      expect(assessment.viewer_ids).to include(first_viewer.id)
      expect(assessment.viewer_ids).to include(second_viewer.id)
    end

    context '#viewer?' do
      it 'returns if a user is a facilitator for an assessment' do
        viewer = Application::create_sample_user

        expect(assessment.viewer?(viewer)).to eq(false)

        assessment.update(viewers: [viewer])
        expect(assessment.viewer?(viewer)).to eq(true)
      end
    end

  end

end
