class ReminderNotificationWorker
  include ::Sidekiq::Worker

  def perform(id, type, message)
    case type
      when 'Assessment'
        perform_for_assessment(id, message)
      when 'Inventory'
        perform_for_inventory(id, message)
    end
  end

  def perform_for_assessment(assessment_id, message)
    assessment = find_assessment(assessment_id)

    create_message_entry(assessment, message)

    assessment.participants.each do |participant|
      next if participant.response && participant.response.completed?
      AssessmentsMailer
          .reminder(assessment, message, participant)
          .deliver_now

      participant.update(reminded_at: Time.now)
    end
  end

  def perform_for_inventory(inventory_id, message)
    inventory = Inventory.where(id: inventory_id).first
    create_message_entry(inventory, message)

    inventory.participants.each do |participant|
      # TODO:  Need to guard against those who have already been reminded
      InventoryInvitationMailer
          .reminder(inventory, message, participant)
          .deliver_now

      participant.update(reminded_at: Time.now)
    end
  end

  private
  def create_message_entry(tool, message)
    Message.create!(tool: tool,
                    content: message,
                    category: :reminder,
                    sent_at: Time.now)
  end

  def find_assessment(id)
    Assessment.find(id)
  end
end
