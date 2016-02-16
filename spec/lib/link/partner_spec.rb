require 'spec_helper'

describe Link::Partner do
  let(:assessment) {
    @assessment_with_participants
  }

  let(:subject) {
    Link::Partner
  }

  let(:user) {
    FactoryGirl.create(:user, :with_district)
  }

  before(:each) do
    create_magic_assessments
    create_responses
  end

  def links
    subject.new(assessment, user).execute
  end

  describe 'access' do
    it 'returns request access when no relation' do
      allow(assessment).to receive(:network_partner?)
                               .with(user)
                               .and_return(false)

      expect(links[:access][:title]).to eq('Request Access')
      expect(links[:access][:type]).to eq(:request_access)
    end

    it 'returns pending when there is a pending request' do
      AccessRequest.create!(user_id: user.id,
                            assessment_id: assessment.id,
                            roles: [:viewer])

      expect(links[:access][:type]).to eq(:pending)
    end
  end
end

