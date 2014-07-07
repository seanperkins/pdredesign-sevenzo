require 'spec_helper'

describe AssessmentAuthorizer do

  before           { create_magic_assessments }
  let(:subject)    { AssessmentAuthorizer }
  let(:assessment) { @assessment_with_participants }

  context 'read' do
    it 'is readable by a facilitator' do

    end
  end

  context 'update' do
    it 'is updatable by a facilitator' do

    end
  end

  context 'delete' do
    it 'can be deleted by a facilitator' do
      facilitator = Application::create_sample_user

      assessment.update(facilitators: [facilitator])
      expect(assessment).to be_deletable_by(facilitator)
    end

    it 'can not be updated by a viewer' do
      viewer = Application::create_sample_user

      assessment.update(viewers: [viewer])
      expect(assessment).not_to be_deletable_by(viewer)
    end

    it 'cant be deleted by a participant' do
      expect(assessment).not_to be_deletable_by(@user2)
    end

  end

end

