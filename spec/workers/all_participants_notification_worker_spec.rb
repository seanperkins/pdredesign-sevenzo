require 'spec_helper'

describe AllParticipantsNotificationWorker do
  let(:subject) { AllParticipantsNotificationWorker }

  before { create_magic_assessments }

  let(:assessment) { @assessment_with_participants }

  it 'sends an email to each facilitator' do
    double = double("mailer")

    expect(AssessmentsMailer).to receive(:assigned)
      .with(anything, @user.email)
      .and_return(double)

    expect(AssessmentsMailer).to receive(:assigned)
      .with(anything, @user2.email)
      .and_return(double)

    expect(double).to receive(:deliver).twice
    subject.new.perform(assessment.id)
  end

end
