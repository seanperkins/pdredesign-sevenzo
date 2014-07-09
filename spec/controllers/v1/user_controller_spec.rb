require 'spec_helper'

describe V1::UserController do

  before do
    request.env["HTTP_ACCEPT"] = 'application/json'

    @user = Application::create_sample_user
    sign_in @user
  end

  render_views

  context '#request_reset' do
    before { sign_out :user }
    before { @user.update(email: 'some_user@gmail.com') }

    it 'sends the reset to a user' do
      post :request_reset, email: 'some_user@gmail.com'
      assert_response :success
    end

    it 'sets the reset_password_token' do
      allow(controller).to receive(:hash).and_return('xyz')

      post :request_reset, email: 'some_user@gmail.com'
      expect(User.find(@user.id).reset_password_token).to eq('xyz')
    end

    it 'sets the reset_password_token' do
      @user.update(reset_password_sent_at: nil)

      post :request_reset, email: 'some_user@gmail.com'
      expect(User.find(@user.id).reset_password_sent_at).not_to be_nil
    end

    it 'queues up an email to be sent to user' do
      expect(PasswordResetNotificationWorker).to receive(:perform_async)
        .with(@user.id)

      post :request_reset, email: 'some_user@gmail.com'
    end

  end

  context '#reset' do
    before { sign_out :user }

    it 'returns unauthorized if the token is not found' do
      @user.update(reset_password_token: 'expected_token')
      post :reset, token: 'other_token', password: 'xyz'

      assert_response :unauthorized
    end

    it 'requires the right token to reset password' do
      @user.update(reset_password_token: 'expected_token')

      post :reset, token: 'expected_token', password: 'xyz1235'
      assert_response :success

      expect(User.find(@user.id).valid_password?('xyz1235')).to eq(true)
    end

    it 'resets the password token and sent_at' do
      @user.update(reset_password_token: 'expected_token',
                   reset_password_sent_at: Time.now)

      post :reset, token: 'expected_token', password: 'xyz1235'
      assert_response :success

      expect(User.find(@user.id).reset_password_token).to eq(nil)
      expect(User.find(@user.id).reset_password_sent_at).to eq(nil)
    end

    it 'returns errors when user cant be updated' do
      @user.update(reset_password_token: 'expected_token')

      post :reset, token: 'expected_token', password: 'xyz'
      assert_response 422

      expect(json["errors"]["password"]).not_to eq(nil)
    end


  end

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

    it 'sends the signup notification to the user' do
      post_create_user
      expect(SignupNotificationWorker.jobs.count).to eq(1)
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
