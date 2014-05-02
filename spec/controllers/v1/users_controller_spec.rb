require 'spec_helper'

describe V1::UsersController do

  before do
    request.env["HTTP_ACCEPT"] = 'application/json'

    @user = Application::create_sample_user
    sign_in @user
  end

  render_views

  context '#show' do
    it 'requires a user to be logged in' do
      sign_out :user
      get :show
      assert_response :unauthorized
    end

    it 'returns the current user' do
      get :show
      expect(json["first_name"]).to eq('Example')
    end
  end

end
