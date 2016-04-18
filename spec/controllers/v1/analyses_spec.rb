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
      assert_response :unauthorized
    end

    it 'creates a record' do
      sign_in inventory.owner

      post :create,
           inventory_id: inventory.id,
           name: "name",
           district_id: 1,
           deadline: "11/14/2042"

      assert_response 201
    end
  end
end
