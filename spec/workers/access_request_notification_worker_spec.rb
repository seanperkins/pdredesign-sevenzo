require 'spec_helper'

describe AccessRequestNotificationWorker do
  let(:subject) {
    AccessRequestNotificationWorker
  }

  let(:facilitator) {
    FactoryGirl.create(:user, :with_district)
  }

  let(:assessment) {
    @assessment_with_participants
  }

  let(:request) {
    AccessRequest.create!(user: FactoryGirl.create(:user, :with_district),
                          assessment: assessment,
                          roles: [:facilitator])
  }

  before(:each) do
    create_magic_assessments
  end

  it 'sends an email to each facilitator' do
    double = double('mailer')
    assessment.facilitators << facilitator

    expect(AccessRequestMailer).to receive(:request_access)
                                       .with(request, facilitator.email)
                                       .and_return(double)

    expect(AccessRequestMailer).to receive(:request_access)
                                       .with(request, @facilitator2.email)
                                       .and_return(double)

    expect(double).to receive(:deliver_now).twice
    subject.new.perform(request.id)
  end
end
