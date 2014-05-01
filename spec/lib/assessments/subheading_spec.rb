require 'spec_helper'

describe Assessments::Subheading do
  let(:subject) { Assessments::Subheading }

  before do
    @double = double("assessment")
  end

  context '#subheading' do
    it 'returns not yet submitted' do
      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(false)

      allow(@double).to receive(:participant_responses).and_return([1])
      allow(@double).to receive(:participants).and_return([1,2])
      expect(@double).to receive(:participants_not_responded)

      subheading = subject.new(@double, :facilitator).subheading
      expect(subheading).to eq('Not yet submitted:')
    end

    it 'returns all participants...' do
      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(false)

      allow(@double).to receive(:participant_responses).and_return([1,2])
      allow(@double).to receive(:participants).and_return([1,2])

      subheading = subject.new(@double, :facilitator).subheading
      expect(subheading).to match('All participants have completed')     

    end

    it 'returns Please complet....' do
      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :submitted_at, :present?)
        .and_return(false)

      subheading = subject.new(@double, :facilitator).subheading
      expect(subheading).to match('Please complete and submit')
    end

    it 'returns Viewed Report' do
      allow(@double).to receive_message_chain(:response, :present?)
        .and_return(true)

      allow(@double).to receive_message_chain(:response, :submitted_at, :present?)
        .and_return(true)

      expect(@double).to receive(:participants_viewed_report)
      subheading = subject.new(@double, :facilitator).subheading
      expect(subheading).to match('Viewed Report:')
    end
  end

end
