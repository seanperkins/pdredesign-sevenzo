require 'spec_helper'

describe Assessments::Link do
  let(:subject) { Assessments::Link }

  before do
    @double = double("assessment").as_null_object
  end

  context '#links' do 
    it 'returns a dashboard link' do 
      allow(@double).to receive_message_chain(:assigned_at, :present?)
        .and_return(true)

      links = subject.new(@double, :facilitator).links
      expect(links[:dashboard][:title]).to eq("Dashboard")
    end


    it 'returns a finish and assign link' do
      allow(@double).to receive_message_chain(:assigned_at, :present?)
        .and_return(false)

      links = subject.new(@double, :facilitator).links
      expect(links[:dashboard][:title]).to eq("Finish & Assign")
    end

    it 'returns a message link' do 
      allow(@double).to receive_message_chain(:assigned_at, :present?)
        .and_return(true)

      links = subject.new(@double, :member).links
      expect(links[:messages][:active]).to eq(true)
    end

    it 'returns a disabled message link' do 
      allow(@double).to receive_message_chain(:assigned_at, :present?)
        .and_return(false)

      links = subject.new(@double, :member).links
      expect(links[:messages][:active]).to eq(false)
    end

    it 'returns a report link' do
      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :submitted_at, :present?)
        .and_return(true)

      links = subject.new(@double, :facilitator).links
      expect(links[:report][:active]).to eq(true)
    end

    it 'returns a disabled report link' do
      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(false)

      allow(@double).to receive_message_chain(:response, :submitted_at, :present?)
        .and_return(true)

      links = subject.new(@double, :facilitator).links
      expect(links[:report][:active]).to eq(false)
    end

    it 'returns a consensus link' do
      allow(@double).to receive_message_chain(:assigned_at, :present?)
        .and_return(false)

      links = subject.new(@double, :facilitator).links
      expect(links[:consensus][:active]).to eq(false)
    end

    it 'returns a new consensus link' do
      allow(@double).to receive_message_chain(:assigned_at, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(false)

      links = subject.new(@double, :facilitator).links
      expect(links[:consensus][:type]).to eq(:new_consensus)
    end

    it 'returns a show consensus link' do
      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :submitted_at, :present?)
        .and_return(true)

      links = subject.new(@double, :member).links
      expect(links[:consensus][:type]).to eq(:show_response)
    end

    it 'returns a disabled consensus link' do
      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :submitted_at, :present?)
        .and_return(false)

      links = subject.new(@double, :member).links
      expect(links[:consensus][:type]).to eq(:none)
    end

    it 'returns a edit consensus link' do
      allow(@double).to receive_message_chain(:assigned_at, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :submitted_at, :present?)
        .and_return(false)

      links = subject.new(@double, :facilitator).links
      expect(links[:consensus][:type]).to eq(:edit_report)
    end

    it 'returns a show report link' do
      allow(@double).to receive_message_chain(:assigned_at, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :submitted_at, :present?)
        .and_return(true)

      links = subject.new(@double, :facilitator).links
      expect(links[:consensus][:type]).to eq(:show_report)
    end

    it 'returns :dashboard, :consensus, :report for facilitators' do
      links = subject.new(@double, :facilitator).links

      expect(links.count).to eq(3)

      [:dashboard, :consensus, :report].each do |type|
        expect(links[type]).to_not be_nil
      end
    end

    it 'returns :message, :consensus, :report for members' do
      links = subject.new(@double, :member).links

      expect(links.count).to eq(3)

      [:messages, :consensus, :report].each do |type|
        expect(links[type]).to_not be_nil
      end
    end

  end
end
