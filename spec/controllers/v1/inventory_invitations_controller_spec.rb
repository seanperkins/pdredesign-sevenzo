require 'spec_helper'

describe V1::InventoryInvitationsController do
  render_views

  describe '#create' do
    context 'without user' do
      let(:inventory) { FactoryGirl.create(:inventory) }

      before(:each) do
        sign_out :user
        post :create, inventory_id: inventory.id, format: :json
      end

      it 'requires logged in user' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'as non-facilitator' do
      let(:user) { FactoryGirl.create(:user) }
      let(:inventory) { FactoryGirl.create(:inventory) }

      before(:each) do
        sign_in user
        post :create, inventory_id: inventory.id
      end

      it 'requires a facilitator to create a invite' do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
=begin


    context 'with facilitator' do
      before { sign_in @facilitator2 }
      def valid_post
        post :create,
          assessment_id: assessment.id,
          first_name:    "john",
          last_name:     "doe",
          email:         "john_doe@gmail.com"
      end

      it 'can create an invitation' do
        valid_post

        assert_response :success
        expect(UserInvitation.find_by_email('john_doe@gmail.com')).not_to be_nil
      end

      it 'sets the team_role when is a new participant' do
        params = { first_name: "john", last_name: "doe", email: "johndoe+newuser@mobility-labs.com", team_role: "Finance", assessment_id: assessment.id }
        post :create, params

        assert_response :success
        expect(UserInvitation.find_by(email: 'johndoe+newuser@mobility-labs.com').team_role).not_to be_nil
      end

      it 'returns errors gracefully with errors' do
        post :create,
          assessment_id: assessment.id,
          first_name:    "john",
          last_name:     "doe"

        assert_response 422
        expect(json["errors"]).not_to be_empty
      end

      it 'doesnt allow an already invited user to get invited to the same assessment' do
        UserInvitation.create!(last_name: 'doe',
          first_name: 'john',
          email: 'john_doe@gmail.com',
          assessment_id: assessment.id)
        
        valid_post

        assert_response 422
        expect(json["errors"]["email"]).to include("User has already been invited")
      end

      it 'allows a user to be invited to two assessments' do
        UserInvitation.create!(last_name: 'doe',
          first_name: 'john',
          email: 'john_doe@gmail.com',
          assessment_id: 1)
        
        valid_post

        assert_response :success
      end

      it 'allows a user to be a facilitator' do
        post :create,
          assessment_id: assessment.id,
          first_name:    "john",
          last_name:     "doe",
          email:         "john_doe@gmail.com",
          role:          "facilitator"

        expect(
          assessment.facilitator?(
            User.find_by(email: 'john_doe@gmail.com'))
        ).to eq(true)
      end

    end

    context 'worker' do
      before { sign_in @facilitator2 }

      it 'sends an invite when :send_invite is present' do
        post :create,
          send_invite: true,
          assessment_id: assessment.id,
          first_name:    "john",
          last_name:     "doe",
          email:         "john_doe@gmail.com"

        expect(UserInvitationNotificationWorker.jobs.count).to eq(1)

      end

      it 'does not send an invite' do
        post :create,
          assessment_id: assessment.id,
          first_name:    "john",
          last_name:     "doe",
          email:         "john_doe@gmail.com"

        expect(UserInvitationNotificationWorker.jobs.count).to eq(0)
      end
    end 

  end 
=end
end
