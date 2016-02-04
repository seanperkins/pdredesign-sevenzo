require 'spec_helper'

describe AccessGrantedNotificationWorker do
  let(:subject) {
    AccessGrantedNotificationWorker
  }

  let(:assessment) {
    @assessment_with_participants
  }

  let(:user_without_access) {
    FactoryGirl.create(:user)
  }

  before(:each) do
    create_magic_assessments
  end


  it 'sends an email notification on notify method' do
    double = double('mailer')

    expect(AccessGrantedMailer).to receive(:notify)
                                       .with(assessment, user_without_access, 'facilitator')
                                       .and_return(double)

    expect(double).to receive(:deliver_now)
    subject.new.perform(assessment.id, user_without_access.id, 'facilitator')
  end
end