require 'spec_helper'

describe Assessment do

  let(:assessment) {
    @assessment_with_participants
  }

  before(:each) do
    create_magic_assessments
  end

  describe 'facilitator' do
    let(:first_facilitator) {
      FactoryGirl.create(:user, :with_district)
    }

    let(:second_facilitator) {
      FactoryGirl.create(:user, :with_district)
    }

    it 'can assign facilitators to an assessment' do
      assessment.update(facilitators: [first_facilitator, second_facilitator])

      expect(assessment.facilitator_ids).to include(first_facilitator.id)
      expect(assessment.facilitator_ids).to include(second_facilitator.id)
    end

    context '#facilitator?' do
      let(:facilitator) {
        FactoryGirl.create(:user, :with_district)
      }

      it 'returns if a user is a facilitator for an assessment' do
        expect(assessment.facilitator?(facilitator)).to eq(false)

        assessment.update(facilitators: [facilitator])
        expect(assessment.facilitator?(facilitator)).to eq(true)
      end
    end
  end

  describe 'network partner' do
    let(:first) {
      FactoryGirl.create(:user, :with_district)
    }

    let(:second) {
      FactoryGirl.create(:user, :with_district)
    }

    it 'can assign network partners to an assessment' do
      assessment.update(network_partners: [first, second])

      expect(assessment.network_partner_ids).to include(first.id)
      expect(assessment.network_partner_ids).to include(second.id)
    end

    context '#network_partner?' do
      let(:partner) {
        FactoryGirl.create(:user, :with_district)
      }

      it 'returns if a user is a facilitator for an assessment' do
        expect(assessment.network_partner?(partner)).to eq(false)

        assessment.update(network_partners: [partner])
        expect(assessment.network_partner?(partner)).to eq(true)
      end
    end
  end

  describe 'viewers' do

    let(:first_viewer) {
      FactoryGirl.create(:user, :with_district)
    }

    let(:second_viewer) {
      FactoryGirl.create(:user, :with_district)
    }

    it 'can assign facilitators to an assessment' do
      assessment.update(viewers: [first_viewer, second_viewer])

      expect(assessment.viewer_ids).to include(first_viewer.id)
      expect(assessment.viewer_ids).to include(second_viewer.id)
    end

    context '#viewer?' do

      let(:viewer) {
        FactoryGirl.create(:user, :with_district)
      }

      it 'returns if a user is a facilitator for an assessment' do
        expect(assessment.viewer?(viewer)).to eq(false)

        assessment.update(viewers: [viewer])
        expect(assessment.viewer?(viewer)).to eq(true)
      end
    end
  end
end
