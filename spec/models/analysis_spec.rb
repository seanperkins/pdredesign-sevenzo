require 'spec_helper'

describe Analysis do

  it { is_expected.to belong_to(:inventory) }

  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :deadline }
  it { is_expected.to validate_presence_of :inventory }

  describe '#save' do
    subject { FactoryGirl.create(:analysis) }

    it { expect(subject.new_record?).to be false }
  end
end
