require 'spec_helper'

describe Link::Participant do
  context 'when the assessment is in draft state' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:link_participant) {
      Link::Participant.new(assessment)
    }

    before(:each) do
      allow(assessment).to receive(:status).and_return :draft
    end

    it {
      expect(link_participant.execute).to be_nil
    }
  end

  context 'when the assessment is not in consensus state' do
    context 'when the assessment is not completed' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:link_participant) {
        Link::Participant.new(assessment)
      }

      before(:each) do
        allow(assessment).to receive(:status).and_return :assessment
        allow(assessment).to receive(:completed?).and_return false
      end

      it {
        expect(link_participant.execute).to eq({action: {title: 'Complete Survey', active: true, type: :response}})
      }
    end

    context 'when the assessment is completed' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:link_participant) {
        Link::Participant.new(assessment)
      }

      before(:each) do
        allow(assessment).to receive(:status).and_return :assessment
        allow(assessment).to receive(:completed?).and_return true
      end

      it {
        expect(link_participant.execute).to eq({
                                                   report: {title: 'View Report', active: false, type: :report},
                                                   action: {title: 'Complete Survey', active: true, type: :response}})
      }
    end

  end

  context 'when the assessment is in consensus state' do
    context 'when the assessment is not fully complete' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:link_participant) {
        Link::Participant.new(assessment)
      }

      before(:each) do
        allow(assessment).to receive(:status).and_return :consensus
        allow(assessment).to receive(:fully_complete?).and_return false
      end

      it {
        expect(link_participant.execute).to eq({action: {title: 'Edit Survey', active: true, type: :response}})
      }
    end

    context 'when the assessment is fully complete' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:link_participant) {
        Link::Participant.new(assessment)
      }

      before(:each) do
        allow(assessment).to receive(:status).and_return :consensus
        allow(assessment).to receive(:fully_complete?).and_return true
      end

      it {
        expect(link_participant.execute).to eq({
                                                   report: {title: 'View Report', active: true, type: :report},
                                                   action: {title: 'Consensus', active: true, type: :consensus}

                                               })
      }
    end
  end
end
