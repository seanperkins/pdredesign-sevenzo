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
