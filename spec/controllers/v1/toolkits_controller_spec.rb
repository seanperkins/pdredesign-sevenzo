require 'spec_helper'

describe V1::ToolkitsController do
  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end
  render_views

  context '#index' do
    it 'can get the index' do
      get :index
      expect(response).to be_success
    end

    it 'returns a list of toolkits' do
      get :index
      expect(json.first["title"]).to eq("I. Strategic Planning")
    end
  end
end
