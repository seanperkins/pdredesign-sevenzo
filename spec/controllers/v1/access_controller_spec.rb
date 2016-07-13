require  'spec_helper'

describe V1::AccessController do
  render_views

  let(:assessment) {
    create(:assessment, :with_participants)
  }

  let(:facilitator) {
    assessment.facilitators.first
  }

  let(:user) {
    create(:user, :with_district)
  }

  before(:each) do
    request.env['HTTP_ACCEPT'] = 'application/json'
    sign_in facilitator
  end

  def create_token_chain(roles = [:facilitator])
    @record = AccessRequest.create!(user: user,
      assessment: assessment,
      roles: roles,
      token: 'expected_token')
  end

  describe 'POST #grant' do
    context 'when not authenticated' do
      before(:each) do
        sign_out :user
        post :grant, token: 'stuff'
      end

      it {
        is_expected.to respond_with :unauthorized
      }
    end

    context 'when not a facilitator' do
      before(:each) do
        sign_in user
        create_token_chain
        post :grant, token: @record.token
      end

      it {
        is_expected.to respond_with :unauthorized
      }
    end

    it 'returns 404 when a token is not found' do
      post :grant, token: 'stuff'
      assert_response :missing
    end

    it 'grants a user permission with :facilitator' do
      create_token_chain

      post :grant, token: @record.token
      expect(assessment.facilitator?(user)).to eq(true)
    end

    context 'user permission is :participant' do
      before :each do
        create_token_chain([:participant])
        post :grant, token: @record.token
      end

      it 'grants a user permission with :participant' do
        expect(assessment.participant?(user)).to eq(true)
      end

      it 'sets participant param invited_at to not be nil ' do
        participant = Participant.find_by_user_id(user.id)
        expect(participant.invited_at).not_to eq(nil)
      end
    end

    it 'grants a user permission with :viewer' do
      create_token_chain([:viewer])

      post :grant, token: @record.token
      expect(assessment.viewer?(user)).to eq(true)
    end

    it 'removes the request after granting' do
      create_token_chain([:viewer])

      post :grant, token: @record.token
      expect(AccessRequest.find_by(token: 'expected_token')).to eq(nil)
    end
  end
end
