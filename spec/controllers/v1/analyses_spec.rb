require 'spec_helper'

describe V1::AnalysesController do
  render_views

  let(:inventory) { FactoryGirl.create(:inventory) }

  before :each do
    request.env['HTTP_ACCEPT'] = 'application/json'
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
           district_id: inventory.district.id,
           deadline: "11/14/2042"

      expect(response).to have_http_status(:created)
    end
  end
end
