# == Schema Information
#
# Table name: participants
#
#  id               :integer          not null, primary key
#  user_id          :integer
#  assessment_id    :integer
#  created_at       :datetime
#  updated_at       :datetime
#  invited_at       :datetime
#  reminded_at      :datetime
#  report_viewed_at :datetime
#

class Participant < ActiveRecord::Base
	belongs_to :user
	belongs_to :assessment
	has_one :response, as: :responder, dependent: :destroy

	validates_uniqueness_of :user_id, scope: :assessment_id

  ## methods to send mailers

  ## Sends Invitations to participant
  def send_invitation(url)
    mandrill_response = AssessmentMailer.assigned(self.assessment, self, url).deliver

    if mandrill_response.present? && mandrill_response.first['status'] == 'sent'
      self.update_column(:invited_at, Time.now)
      if self.assessment.mandrill_id.nil?
        self.assessment.update_column(:mandrill_id, mandrill_response.first['_id'])
        self.assessment.store_message_html
      end
    end
  end
  handle_asynchronously :send_invitation
  
  ## Sends Reminders to participant
  def send_reminder(url, reminder)
    mandrill_response = AssessmentMailer.reminder(self.assessment, self, url, reminder).deliver
    
    if mandrill_response.present? && mandrill_response.first['status'] == 'sent'
      self.update_column(:reminded_at, Time.now)
      if reminder.mandrill_id.nil?
        reminder.update_column(:mandrill_id, mandrill_response.first['_id']) 
        reminder.store_message_html
      end
    end
  end
  handle_asynchronously :send_reminder

end
