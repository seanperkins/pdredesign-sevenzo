require  'spec_helper'

describe V1::InventoryAccessRequestsController do
  render_views

  describe '#index' do
    context 'as signed in user' do
      let(:user) { FactoryGirl.create(:user) }
      let(:inventory) { FactoryGirl.create(:inventory) }
      let!(:access_requests) { FactoryGirl.create_list(:inventory_access_request, 2, :as_facilitator, inventory: inventory) }

      before(:each) do 
        sign_in user
        get :index, inventory_id: inventory.id, format: :json
      end

      it { expect(response).to have_http_status(:success) }

      it  do
        expect(response.body).to match(/requested_permission_level/)
      end
    end
  end

  describe '#create' do
    context 'as signed in user' do
      let(:user) { FactoryGirl.create(:user) }

      before(:each) do 
        sign_in user
      end

      context 'with valid request params' do
        let(:inventory) { FactoryGirl.create(:inventory) }
        let(:access_request) { InventoryAccessRequest.find(json["id"]) }

        before(:each) do 
          post :create,
            inventory_id: inventory.id,
            role: 'facilitator', format: :json
        end

        it { expect(response).to have_http_status(:success) }

        it 'creates a request record' do
          expect(access_request).not_to be_nil
        end

        it { expect(access_request.user_id).to eq user.id }
        it { expect(access_request.role).to eq 'facilitator' }
        it { expect(access_request.inventory_id).to eq inventory.id }
      end

      context 'without role' do
        let(:inventory) { FactoryGirl.create(:inventory) }

        before(:each) do 
          post :create, inventory_id: inventory.id, format: :json
        end

        it { expect(response).to have_http_status(:unprocessable_entity) }

        it { expect(json["errors"]).not_to be_empty }
      end
    end
  end
end
