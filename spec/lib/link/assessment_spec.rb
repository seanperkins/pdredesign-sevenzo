require 'spec_helper'

describe Link::Assessment do
  let(:assessment) {
    create(:assessment, :with_facilitators, :with_participants)
  }

  describe '#execute' do
    context 'when user is a facilitator' do
      let(:user) {
        assessment.facilitators.sample.user
      }

      let(:link_assessment) {
        Link::Assessment.new(assessment, user)
      }

      it {
        expect_any_instance_of(Link::Facilitator).to receive(:execute)
        link_assessment.execute
      }
    end

    context 'when the user is a participant' do
      let(:user) {
        assessment.participants.sample.user
      }

      let(:link_assessment) {
        Link::Assessment.new(assessment, user)
      }

      it {
        expect_any_instance_of(Link::Participant).to receive(:execute)
        link_assessment.execute
      }
    end

    context 'when the user is anything else' do
      let(:user) {
        create(:user)
      }

      let(:link_assessment) {
        Link::Assessment.new(assessment, user)
      }

      it {
        expect_any_instance_of(Link::Partner).to receive(:execute)
        link_assessment.execute
      }
    end
  end
end
