require 'spec_helper' 

describe PasswordResetMailer do
  context '#reset' do
    before do
      @user = Application::create_sample_user
      @user.update(reset_password_token: 'xyz',
                   email: 'some@user.com')
    end

    let(:mail) { PasswordResetMailer.reset(@user) }

    it 'sends the invite mail to the user on invite' do
      expect(mail.to).to include('some@user.com')
    end

  end
end
