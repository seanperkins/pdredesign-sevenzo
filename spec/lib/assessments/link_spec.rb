require 'spec_helper'

describe Assessments::Link do
  before           { create_magic_assessments }
  before           { create_responses }
  let(:assessment) { @assessment_with_participants }
  let(:subject)    { Assessments::Link }

  describe '#assessment_link' do

    before do
      assessment.update(assigned_at: Time.now)
    end

    it 'returns :consensus when status is consensus and is submitted' do
      Response.first.update(submitted_at: Time.now)
      assessment.update(response: Response.first)

      link = subject
        .new(assessment, @user)
        .assessment_link

      expect(link).to eq(:consensus)
    end

    it 'returns new_response when there is no response for the participant' do
      @participant.response.delete

      link = subject
        .new(assessment, @participant.user)
        .assessment_link

      expect(link).to eq(:new_response)
    end

    it 'returns :none when a user is not a participant' do
      new_user = Application::create_sample_user

      link = subject
        .new(assessment, new_user)
        .assessment_link

      expect(link).to eq(:none)

    end

    it 'returns new_response when there is no response for the user' do
      link = subject
        .new(assessment, @participant.user)
        .assessment_link

      expect(link).to eq(:response)
    end

    it 'returns none when the assessment is not assigned' do
      assessment.update(assigned_at: nil)

      link = subject
        .new(assessment, @participant.user)
        .assessment_link

      expect(link).to eq(:none)
    end

  end

  describe '#links' do 
    def links_for(user)
      subject.new(assessment, user).links
    end

    it 'returns a dashboard link' do 
      assessment.update(assigned_at: Time.now)

      links = links_for(@facilitator2)
      expect(links[:dashboard][:title]).to eq("Dashboard")
    end

    it 'returns a finish and assign link' do
      assessment.update(assigned_at: nil)

      links = links_for(@facilitator2)
      expect(links[:dashboard][:title]).to eq("Finish & Assign")
    end

    it 'returns a message link' do 
      assessment.update(assigned_at: Time.now)
      links = links_for(@participant2)
      expect(links[:messages][:active]).to eq(true)
    end

    it 'returns a disabled message link' do 
      links = links_for(@participant2)
      expect(links[:messages][:active]).to eq(false)
    end

    it 'returns a report link' do
      allow(assessment).to receive(:has_response?)
        .and_return(true)

      allow(assessment).to receive_message_chain(:response, :completed?)
        .and_return(true)

      links = links_for(@facilitator2)
      expect(links[:report][:active]).to eq(true)
    end

    it 'returns a disabled report link' do
      allow(assessment).to receive(:has_response?)
        .and_return(false)

      allow(assessment).to receive_message_chain(:response, :completed?)
        .and_return(true)

      links = links_for(@facilitator2)
      expect(links[:report][:active]).to eq(false)
    end

    it 'returns a consensus link' do
      allow(assessment).to receive(:assigned?)
        .and_return(false)

      links = links_for(@facilitator2)
      expect(links[:consensus][:active]).to eq(false)
    end

    it 'returns a new consensus link' do
      allow(assessment).to receive(:assigned?).and_return(true)
      allow(assessment).to receive(:has_response?).and_return(false)

      links = links_for(@facilitator2)
      expect(links[:consensus][:type]).to eq(:new_consensus)
    end

    it 'returns a show response link' do
      allow(assessment).to receive(:has_response?).and_return(true)
      allow(assessment).to receive_message_chain(:response, :completed?).and_return(true)

      links = links_for(@participant2)
      expect(links[:consensus][:type]).to eq(:show_response)
    end

    it 'returns a disabled consensus link' do
      allow(assessment).to receive(:assigned?).and_return(false)

      links = links_for(@participant)
      expect(links[:consensus][:type]).to eq(:none)
    end

    it 'returns a edit consensus link' do
      Response.first.update(submitted_at: nil)
      assessment.update(assigned_at: Time.now, response: Response.first)

      links = links_for(@facilitator2)
      expect(links[:consensus][:type]).to eq(:edit_report)
    end

    it 'returns a show report link' do
      assessment.update(assigned_at: Time.now, response: Response.first)

      links = links_for(@facilitator2)
      expect(links[:consensus][:type]).to eq(:show_report)
    end

    it 'returns :dashboard, :consensus, :report for facilitators' do
      links = links_for(@facilitator2)

      expect(links.count).to eq(3)
      [:dashboard, :consensus, :report].each do |type|
        expect(links[type]).to_not be_nil
      end
    end

    it 'returns :message, :consensus, :report for members' do
      links = links_for(@participant)
      expect(links.count).to eq(3)

      [:messages, :consensus, :report].each do |type|
        expect(links[type]).to_not be_nil
      end
    end

  end
end
