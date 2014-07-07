require 'spec_helper'

describe AssessmentAuthorizer do

  before           { create_magic_assessments }
  let(:subject)    { AssessmentAuthorizer }
  let(:assessment) { @assessment_with_participants }

  before do
    @facilitator = Application::create_sample_user
    assessment.update(facilitators: [@facilitator])

    @viewer = Application::create_sample_user
    assessment.update(viewers: [@viewer])
  end

  context 'read' do
    it 'is readable by own facilitator' do
      expect(assessment).to be_readable_by(@facilitator)
    end
  end

  context 'update' do
    it 'is updatable by a facilitator' do

    end
  end

  context 'delete' do
    it 'can be deleted by a facilitator' do
      expect(assessment).to be_deletable_by(@facilitator)
    end

    it 'can not be updated by a viewer' do
      expect(assessment).not_to be_deletable_by(@viewer)
    end

    it 'cant be deleted by a participant' do
      expect(assessment).not_to be_deletable_by(@user2)
    end

  end

end

