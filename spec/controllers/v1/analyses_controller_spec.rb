require 'spec_helper'

describe V1::AnalysesController do
  render_views

  let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }

  before :each do
    request.env['HTTP_ACCEPT'] = 'application/json'
  end

  context '#index' do
    it 'requires logged in user' do
      sign_out :user

      get :index, inventory_id: inventory.id
      expect(response).to have_http_status(:unauthorized)
    end

    it "gets an inventory's analysis" do
      sign_in inventory.owner

      get :index, inventory_id: inventory.id

      expect(response).to have_http_status(:ok)
    end
  end

  context '#create' do
    it 'requires logged in user' do
      sign_out :user

      post :create, inventory_id: inventory.id
      expect(response).to have_http_status(:unauthorized)
    end

    it 'creates a record' do
      sign_in inventory.owner

      post :create,
           inventory_id: inventory.id,
           name: "name",
           deadline: "11/14/2042"

      expect(response).to have_http_status(:created)
    end
  end

  context '#update' do
    it 'requires logged in user' do
      sign_out :user

      put :update, inventory_id: inventory.id
      expect(response).to have_http_status(:unauthorized)
    end

    it 'updates a record' do
      sign_in inventory.owner

      put :update,
           inventory_id: inventory.id,
           name: "name",
           deadline: "11/14/2042"

      expect(response).to have_http_status(:ok)
    end
  end
end
