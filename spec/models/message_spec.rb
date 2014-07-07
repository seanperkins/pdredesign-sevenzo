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

require 'spec_helper'

describe Message do
  context '#teaser' do 
    it 'returns limited string to 220' do
      message = Message.new(content: '*'*300)
      expect(message.teaser.length).to eq(223)
      expect(message.teaser).to match(/\.\.\.$/)
    end
  end
end
