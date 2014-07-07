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
    
    @other  = Application::create_sample_user
  end

  context 'read' do
    it 'is readable by own facilitator' do
      expect(assessment).to be_readable_by(@facilitator)
    end
    
    it 'is readable by own viewer' do
      expect(assessment).to be_readable_by(@viewer)
    end

    it 'is readable by own participant' do
      expect(assessment).to be_readable_by(@user)
    end

    it 'is not readable by rando user' do
      expect(assessment).not_to be_readable_by(@other)
    end

  end

  context 'update' do
    it 'is updatable by own facilitator' do
      expect(assessment).to be_updatable_by(@facilitator)
    end

    it 'is updatable by owner' do
      expect(assessment).to be_updatable_by(@facilitator2)
    end
 
    it 'is not updateable by own viewer' do
      expect(assessment).not_to be_updatable_by(@viewer)
    end

    it 'is not updateable by own participant' do
      expect(assessment).not_to be_updatable_by(@user)
    end
 
    it 'is not updateable by another user' do
      expect(assessment).not_to be_updatable_by(@other)
    end
 
  end

  context 'delete' do
    it 'can be deleted by a facilitator' do
      expect(assessment).to be_deletable_by(@facilitator)
    end

    it 'cant be deleted by a participant' do
      expect(assessment).not_to be_deletable_by(@user2)
    end

    it 'can not be updated by a viewer' do
      expect(assessment).not_to be_deletable_by(@viewer)
    end

    it 'can not be updated by other user' do
      expect(assessment).not_to be_deletable_by(@other)
    end

  end

end

