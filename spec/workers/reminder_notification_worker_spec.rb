require 'spec_helper'

describe ReminderNotificationWorker do
  before { create_magic_assessments }
  let(:subject)    { ReminderNotificationWorker }
  let(:assessment) { @assessment_with_participants }

  it 'sends the email to each participants email address' do
    double = double("mailer")

    expect(AssessmentsMailer).to receive(:reminder)
      .exactly(2).times
      .with(assessment, 'the message', anything)
      .and_return(double)

    expect(double).to receive(:deliver).twice
    subject.new.perform(assessment.id, 'the message')
  end

  it 'adds a message entry for the assessment' do
    subject.new.perform(assessment.id, 'the message')
    message = Message
      .find_by(assessment_id: assessment.id,
               content: 'the message')

    expect(message).not_to be_nil
  end


end
