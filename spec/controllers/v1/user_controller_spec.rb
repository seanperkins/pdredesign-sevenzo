require 'spec_helper'

describe V1::UserController do

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

  context '#update' do
    it 'updates a users fields' do
      post :update, { first_name: 'updated', last_name: 'user' }

      expect(json["first_name"]).to eq('updated')
    end

    it 'returns errors on ActiveRecord failure' do
      post :update, { email: 'asdfasdf' }

      expect(response.status).to eq(422)
      expect(json["errors"]).to_not be_nil
    end

    xit 'requires a password and password confirm' do
      post :update, { password: 'testtest', password_confirm: 'zzxx' }

      expect(response.status).to eq(422)
      expect(json["errors"]).to_not be_nil

    end
  end

end
