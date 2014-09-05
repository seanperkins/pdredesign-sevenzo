require 'spec_helper'

describe LogoUploader do
  before do
    @org      = Organization.create!(name: 'testorg')
    @uploader = LogoUploader.new(@org) 
  end
  let(:subject) { @uploader }


  it 'has the correct #store_dir' do
    allow(subject).to receive('mounted_as').and_return('logo')
    expect(subject.store_dir).to eq("organization/#{@org.id}/logo")
  end

  it 'has can only upload in .jpg .jpeg .gif .png' do
    allowed = ['jpg', 'jpeg', 'gif', 'png']

    allowed.each do |ext|
      expect(subject.extension_white_list).to include(ext)
    end

  end

end
