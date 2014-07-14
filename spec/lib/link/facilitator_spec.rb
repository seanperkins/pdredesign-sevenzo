require 'spec_helper'

describe Link::Facilitator do
  before           { create_magic_assessments }
  before           { create_responses }
  let(:assessment) { @assessment_with_participants }
  let(:subject)    { Link::Facilitator }

  def links
    subject.new(assessment).execute
  end

  describe 'dashboard' do
    it 'always returns a dashboard link' do
      expect(links[:dashboard][:title]).to  eq("Dashboard")
      expect(links[:dashboard][:active]).to eq(true)
      expect(links[:dashboard][:type]).to   eq(:dashboard)
    end
  end

  describe 'consensus' do
    it 'returns a new consensus link when there isnt one' do
      allow(assessment).to receive(:status).and_return(:assessment)

      expect(links[:consensus][:title]).to  eq("Consensus")
      expect(links[:consensus][:active]).to eq(true)
      expect(links[:consensus][:type]).to   eq(:new_consensus)
    end

    it 'returns a consensus link when is a consensus' do
      allow(assessment).to receive(:status).and_return(:consensus)

      expect(links[:consensus][:type]).to   eq(:consensus)
    end
  end

  describe 'report' do
    it 'returns a disabled report link when not consensus' do
      allow(assessment).to receive(:status).and_return(:assessment)

      expect(links[:report][:title]).to  eq("Report")
      expect(links[:report][:active]).to eq(false)
      expect(links[:report][:type]).to   eq(:report)
    end

    it 'returns an active report link when consensus' do
      allow(assessment).to receive(:status).and_return(:consensus)

      expect(links[:report][:active]).to eq(true)
    end
  end
  
end

