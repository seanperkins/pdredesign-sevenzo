require 'spec_helper'

describe Link::Facilitator do

  context 'when assessment is in draft state' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:link_facilitator) {
      Link::Facilitator.new(assessment)
    }

    before(:each) do
      allow(assessment).to receive(:status).and_return :draft
      allow(assessment).to receive(:completed?).and_return false
    end

    it {
      expect(link_facilitator.execute)
          .to eq({finish: {title: 'Finish & Assign', active: true, type: :finish}})
    }
  end

  context 'when assessment is fully complete' do

    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:link_facilitator) {
      Link::Facilitator.new(assessment)
    }

    context 'when consensus has not yet been reached' do
      before(:each) do
        allow(assessment).to receive(:fully_complete?).and_return true
        allow(assessment).to receive(:status).and_return :assessment
      end

      it {
        expect(link_facilitator.execute)
            .to eq({
                       consensus: {title: 'Create Consensus', active: true, type: :new_consensus},
                       report: {title: 'View Report', active: false, type: :report},
                       dashboard: {title: 'View Dashboard', active: true, type: :dashboard}
                   })
      }
    end

    context 'when consensus has been reached' do
      before(:each) do
        allow(assessment).to receive(:fully_complete?).and_return true
        allow(assessment).to receive(:status).and_return :consensus
      end

      it {
        expect(link_facilitator.execute)
            .to eq({
                       consensus: {title: 'View Consensus', active: true, type: :consensus},
                       report: {title: 'View Report', active: true, type: :report},
                       dashboard: {title: 'View Dashboard', active: true, type: :dashboard}
                   })
      }
    end
  end

  context 'when assessment is in consensus state' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:link_facilitator) {
      Link::Facilitator.new(assessment)
    }

    before(:each) do
      allow(assessment).to receive(:fully_complete?).and_return false
      allow(assessment).to receive(:status).and_return :consensus
    end

    it {
      expect(link_facilitator.execute)
          .to eq({
                     consensus: {title: 'View Consensus', active: true, type: :consensus},
                     dashboard: {title: 'View Dashboard', active: true, type: :dashboard}
                 })
    }
  end


  context 'when the user is a participant of the assessment' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let!(:owner_as_participant) {
      tool_member = assessment.tool_members.where(user: assessment.user).first
      tool_member.roles << ToolMember.member_roles[:participant]
      tool_member.save!
    }

    let(:link_facilitator) {
      Link::Facilitator.new(assessment)
    }

    before(:each) do
      allow(assessment).to receive(:fully_complete?).and_return false
      allow(assessment).to receive(:status).and_return :assessment
    end

    it {
      expect(link_facilitator.execute)
          .to eq({
                     response: {title: 'Complete Survey', active: true, type: :response},
                     consensus: {title: 'Create Consensus', active: true, type: :new_consensus},
                     dashboard: {title: 'View Dashboard', active: true, type: :dashboard}
                 })
    }
  end

  context 'when in any other state' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:link_facilitator) {
      Link::Facilitator.new(assessment)
    }

    before(:each) do
      allow(assessment).to receive(:fully_complete?).and_return false
      allow(assessment).to receive(:status).and_return :assessment
    end

    it {
      expect(link_facilitator.execute)
          .to eq({
                     consensus: {title: 'Create Consensus', active: true, type: :new_consensus},
                     dashboard: {title: 'View Dashboard', active: true, type: :dashboard}
                 })
    }
  end
end
