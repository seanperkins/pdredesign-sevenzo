# == Schema Information
#
# Table name: dismissed_popovers
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  popover_id :string(255)
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe DismissedPopover do
  let(:subject) {
    DismissedPopover
  }

  let(:user) {
    FactoryGirl.create(:user, :with_district)
  }

  before(:each) do
    3.times do |i|
      subject.create(user: user, popover_id: "page#{i}_popover")
    end
  end

  it 'requires :popover_id' do
    popover = subject.new(user: user)
    expect(popover.valid?).to eq(false)
    expect(popover.errors[:popover_id]).to_not be_nil
  end

  it 'requires a :user' do
    popover = subject.new(popover_id: 'some_id')
    expect(popover.valid?).to eq(false)
    expect(popover.errors[:user_id]).to_not be_nil
  end

  it 'does not created duplicate records' do
    first  = subject.create(user: user, popover_id: 'first')
    second = subject.create(user: user, popover_id: 'second')
    third  = subject.create(user: user, popover_id: 'second')
    
    expect(first.valid?).to eq(true)
    expect(second.valid?).to eq(true)
    expect(third.valid?).to eq(false)
  end

  context '#for_user' do
    it 'returns the popovers viewed for this user' do
      expect(subject.for_user(user[:id]).count).to eq(3)
    end
  end

  context '#seen?' do
    it 'returns true if a user has seen popover before' do
      expect(subject.seen?(user[:id], 'page1_popover')).to eq(true)
    end

    it 'returns false if a user has not seen a popover' do
      expect(subject.seen?(user[:id], 'page4_popover')).to eq(false)
    end
  end
end
