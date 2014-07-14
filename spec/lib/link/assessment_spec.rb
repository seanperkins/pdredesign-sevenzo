require 'spec_helper'

describe Link::Assessment do
  before           { create_magic_assessments }
  before           { create_responses }
  let(:assessment) { @assessment_with_participants }
  let(:subject)    { Link::Assessment }

  describe '#target' do
    it 'returns Partner when a user is a network_partner' do
      partner = Application::create_sample_user
      partner.update(role: :network_partner)

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

    it 'defaults to Viewer when its a rando user' do
      user = Application::create_sample_user
      target = subject.new(assessment, user).send(:target)
      expect(target).to eq(Link::Viewer)
    end

  end

  describe '#execute' do
    it 'passes to the target' do
      user   = Application::create_sample_user
      links  = subject.new(assessment, user)
      double = double("Target")

      expect(double).to receive_message_chain(:new, :execute)
      allow(links).to   receive(:target).and_return(double)

      links.execute
    end
  end
end
