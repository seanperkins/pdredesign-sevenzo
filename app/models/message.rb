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
end
