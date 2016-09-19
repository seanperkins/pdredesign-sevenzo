require 'spec_helper'

describe V1::ToolMembersController do
  render_views
  before(:each) do
    request.env['HTTP_ACCEPT'] = 'application/json'
  end

  describe 'POST #create' do
    context 'when the user is not authenticated' do
      before(:each) do
        sign_out :user

        post :create, tool_member: {tool_type: 'Assessment', tool_id: 1, role: 0, user_id: 1}
      end

      it {
        is_expected.to respond_with(:unauthorized)
      }
    end

    context 'when the user is authenticated' do
      context 'when the user is a participant on the tool' do
        let(:user) {
          create(:user)
        }

        let(:candidate) {
          create(:user)
        }

        let(:tool) {
          create(:assessment)
        }


        let!(:tool_member) {
          create(:tool_member, :as_participant, tool: tool, user: user)
        }

        before(:each) do
          sign_in user
          post :create, tool_member: {tool_type: 'Assessment', tool_id: 1, role: 0, user_id: candidate.id}
        end

        it {
          is_expected.to respond_with(:forbidden)
        }
      end
    end
  end
end