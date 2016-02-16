require 'spec_helper'

describe Link::Assessment do
  let(:assessment) {
    @assessment_with_participants
  }

  let(:subject) {
    Link::Assessment
  }
  before(:each) do
    create_magic_assessments
    create_responses
  end


  describe '#target' do
    let(:partner) {
      FactoryGirl.create(:user, :with_district, :with_network_partner_role)
    }

    let(:user) {
      FactoryGirl.create(:user, :with_district)
    }

    it 'returns Partner when a user is a network_partner' do
      target = subject.new(assessment, partner).send(:target)
      expect(target).to eq(Link::Partner)
    end

    it 'returns Facilitator when a user is a facilitator for an assessment' do
      target = subject.new(assessment, @facilitator2).send(:target)
      expect(target).to eq(Link::Facilitator)
    end

    it 'returns Participant when a user is a participant of an assessment' do
      target = subject.new(assessment, @participant.user).send(:target)
      expect(target).to eq(Link::Participant)
    end

    it 'returns viewer when a network_partner is a viewer of an assessment' do
      assessment.viewers << partner
      target = subject.new(assessment, partner).send(:target)
      expect(target).to eq(Link::Viewer)
    end

    it 'defaults to Viewer when its a rando user' do
      target = subject.new(assessment, user).send(:target)
      expect(target).to eq(Link::Viewer)
    end
  end

  describe '#execute' do
    let(:user) {
      FactoryGirl.create(:user, :with_district)
    }

    it 'passes to the target' do
      links = subject.new(assessment, user)
      double = double('Target')

      expect(double).to receive_message_chain(:new, :execute)
      allow(links).to receive(:target).and_return(double)

      links.execute
    end
  end
end
