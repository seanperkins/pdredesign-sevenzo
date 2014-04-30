require 'spec_helper'

describe V1::SessionsController do
  render_views

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
    request.env["devise.mapping"] = Devise.mappings[:user]
  end
  
  it 'denies unkown users' do
    post :create, { email: 'someuser@user.com', password: 'somepassword' }
    expect(response.status).to eq(401)
  end

  context 'valid user' do
    before do
      Application::create_sample_user(email: 'example@user.com')
    end

    it 'denies a known user with wrong password' do
      post :create, { email: 'example@user.com', password: 'bad' }
      expect(response.status).to eq(401)
    end

    it 'Allows a working user' do
      post :create, { email: 'example@user.com', password: 'sup3r_s3cr3t' }
      expect(response).to be_success
    end

    it 'returns the user hash' do
      post :create, { email: 'example@user.com', password: 'sup3r_s3cr3t' }
      expect(json["user"]["email"]).to eq('example@user.com')
      expect(json["user"]["password"]).to be_nil
      expect(json["user"]["first_name"]).to eq('Example')
      expect(json["user"]["last_name"]).to eq('User')
    end
  end

 
end
