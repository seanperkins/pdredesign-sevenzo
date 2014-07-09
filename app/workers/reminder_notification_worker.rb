class ReminderNotificationWorker
  include ::Sidekiq::Worker

  def perform(assessment_id, message)
    assessment = find_assessment(assessment_id)

    create_message_entry(assessment, message)

    assessment.participants.each do |participant|
      AssessmentsMailer
        .reminder(assessment, message, participant)
        .deliver
    end
  end

  private
  def create_message_entry(assessment, message)
    Message.create!(assessment_id: assessment.id,
                    content: message,
                    category: :reminder,
                    sent_at: Time.now)
  end

  def find_assessment(id)
    Assessment.find(id)
  end
end
