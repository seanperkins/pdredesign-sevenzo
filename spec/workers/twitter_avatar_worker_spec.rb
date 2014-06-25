require 'spec_helper'

describe TwitterAvatarWorker do
  let(:subject) { TwitterAvatarWorker }
  before do
    @user = Application::create_sample_user
    @double = double("Twitter::UpdateAvatar").as_null_object
    allow(Twitter::UpdateAvatar).to receive(:new).and_return(@double)
  end

  it 'queues the twitter avatar updater job' do
    subject.perform_async(@user.id)
    expect(subject.jobs.count).to eq(1)
  end

  it 'finds the correct user' do
    found_user = subject.new.send(:find_user, @user.id)
    expect(found_user).to eq(@user)
  end

  it 'calls the twitter avatar update service with the found user' do
    expect(Twitter::UpdateAvatar).to receive(:new).with(@user)
    expect(@double).to receive(:execute)
    subject.new.perform(@user.id)
  end

end
