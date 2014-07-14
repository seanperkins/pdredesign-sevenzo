require 'spec_helper'

describe Link::Partner do
  before           { create_magic_assessments }
  before           { create_responses }
  let(:assessment) { @assessment_with_participants }
  let(:subject)    { Link::Partner }

  before { @user = Application::create_sample_user }

  def links
    subject.new(assessment, @user).execute
  end

  describe 'access' do
    it 'returns request access when no relation' do
      allow(assessment).to receive(:network_partner?)
        .with(@user)
        .and_return(false)

      expect(links[:access][:title]).to   eq('Request Access')
      expect(links[:access][:type]).to    eq(:request_access)
      expect(links[:access][:active]).to  eq(true)
    end

    it 'returns pending request when network partner' do
      allow(assessment).to receive(:network_partner?)
        .with(@user)
        .and_return(true)

      expect(links[:access][:title]).to   eq('Access Pending')
      expect(links[:access][:type]).to    eq(:pending)
      expect(links[:access][:active]).to  eq(false)

    end

  end

end

