require 'spec_helper'

describe AccessGrantedMailer do
  let(:subject) {
    AccessGrantedMailer

  }
  let(:assessment) {
    @assessment_with_participants

  }

  let(:user) {
    FactoryGirl.create(:user)
  }

  before(:each) do
    create_magic_assessments
  end

  describe '#notify' do
    let(:mail) { subject.notify(assessment, user, 'facilitator') }

    it "sets the mail address to the user's email address" do
      expect(mail.to).to include(user.email)
    end

    it 'sets the body of the email to the specified role' do
      expect(mail.body).to include('facilitator')
    end
  end
end