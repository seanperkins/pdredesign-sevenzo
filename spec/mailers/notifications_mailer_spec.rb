require 'spec_helper' 

describe NotificationsMailer do
  context '#invite' do
    before { create_magic_assessments }
    let(:assessment) { @assessment_with_participants }

    before do
      @invite = UserInvitation
        .create!(first_name: 'some',
                 last_name:  'user',
                 email:      'test@user.com',
                 assessment: assessment,
                 user_id:    @user.id)
    end

    let(:mail) { NotificationsMailer.invite(@invite.id) }

    it 'sends the invite mail to the user on invite' do
      expect(mail.to).to include('test@user.com')
    end
  end
end