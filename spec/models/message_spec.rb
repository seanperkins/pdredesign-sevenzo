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

  it { is_expected.to belong_to(:tool) }

  context '#teaser' do
    let(:message) {
      create(:message)
    }

    context 'when printing a string larger than 220 characters' do
      before(:each) do
        message.content = Faker::Lorem.characters(221)
      end

      it 'limits the string to 223 characters' do
        expect(message.teaser.size).to eq 223
      end

      it 'adds an ellipsis at the end' do
        expect(message.teaser).to match(/\.\.\.$/)
      end
    end

    context 'when printing an empty string' do
      before(:each) do
        message.content = ''
      end

      it 'returns the empty string' do
        expect(message.teaser.size).to eq 0
      end
    end

    context 'when printing a string between 0 and 220 characters' do
      it 'prints out the correct length' do
        (1..220).each do |i|
          message.content = Faker::Lorem.characters(i)
          expect(message.teaser.size).to eq i
        end
      end
    end
  end
end
