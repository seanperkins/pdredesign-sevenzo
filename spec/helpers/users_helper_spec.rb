require 'spec_helper'

describe UsersHelper do
  include UsersHelper
  
  describe '#avatar_image' do
    it 'returns a default image when the avatar is missing' do
      expect(avatar_image(nil)).to eq('/images/fallback/default.png')
      expect(avatar_image('')).to eq('/images/fallback/default.png')
    end

    it 'returns an image url' do
      expect(avatar_image('http://example.com/images.png'))
        .to eq('http://example.com/images.png')
    end
  end
 
end
