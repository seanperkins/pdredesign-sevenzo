# == Schema Information
#
# Table name: messages
#
#  id            :integer          not null, primary key
#  content       :text
#  category      :string(255)
#  sent_at       :datetime
#  assessment_id :integer
#  created_at    :datetime
#  updated_at    :datetime
#  mandrill_id   :string(255)
#  mandrill_html :text
#

class Message < ActiveRecord::Base
	belongs_to :assessment
	MAX_LENGTH_TEASER = 220

	def teaser
	  return content unless content
    return content if content.length <= MAX_LENGTH_TEASER
    return "#{content[0..MAX_LENGTH_TEASER-1]}..."
  end
  
  ## Store Message HTML
  ## This grabs the message content from Mandrill using the API
  ## and stores it in the DB if the content exists, otherwise it runs again in ten minutes
  ## this will continue until we are able to grab the data from Mandrill every ten minutes
  def store_message_html
    if self.mandrill_html.nil?
      mandrill = Mandrill::API.new(ENV['MANDRILL_APIKEY'])
      mandrill_response = mandrill.messages.content(self.mandrill_id)
      self.update_column(:mandrill_html, mandrill_response['html']) if mandrill_response.present?
    end
  rescue
    self.store_message_html
  end
  handle_asynchronously :store_message_html, run_at: Proc.new { 10.minutes.from_now }
  
end
