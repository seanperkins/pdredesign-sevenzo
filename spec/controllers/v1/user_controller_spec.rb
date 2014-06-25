require 'spec_helper'

describe V1::UserController do

  before do
    request.env["HTTP_ACCEPT"] = 'application/json'

    @user = Application::create_sample_user
    sign_in @user
  end

  render_views

  context '#create' do
    before { @district = District.create! }
    before { sign_out :user }

    def post_create_user(options = {})
      opts = { first_name: 'kim',
               email: 'kim@gov.nk',
               last_name: 'jong',
               district_ids: @district.id,
               password: 'some_password',
               team_role: 'leader'}

      post :create, opts.merge(options)
    end


    it 'can create a user' do
      post_create_user
      kim = User.find_by(email: 'kim@gov.nk')

      assert_response :success
      expect(kim[:first_name]).to eq('kim')
      expect(kim[:last_name]).to eq('jong')
      expect(kim[:team_role]).to eq('leader')

      expect(kim.district_ids).to eq([@district.id])
      expect(kim.valid_password?('some_password')).to eq(true)
    end

    it 'sets default user to a member' do
      post_create_user

      kim = User.find_by(email: 'kim@gov.nk')
      expect(kim[:role]).to eq('member')
    end

    it 'sets the user to the role provided' do
      post_create_user(role: :facilitator)

      kim = User.find_by(email: 'kim@gov.nk')
      expect(kim[:role]).to eq('facilitator')
    end
  end

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
      put :update, { first_name: 'updated', last_name: 'user' }

      expect(json["first_name"]).to eq('updated')
    end

    it 'returns errors on ActiveRecord failure' do
      put :update, { email: 'asdfasdf' }

      expect(response.status).to eq(422)
      expect(json["errors"]).to_not be_nil
    end

    xit 'requires a password and password confirm' do
      put :update, { password: 'testtest', password_confirm: 'zzxx' }

      expect(response.status).to eq(422)
      expect(json["errors"]).to_not be_nil
    end
  end

end
