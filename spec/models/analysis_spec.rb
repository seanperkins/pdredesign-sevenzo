# == Schema Information
#
# Table name: analyses
#
#  id           :integer          not null, primary key
#  name         :text
#  deadline     :datetime
#  inventory_id :integer
#  created_at   :datetime
#  updated_at   :datetime
#  message      :text
#

require 'spec_helper'

describe Analysis do

  describe 'validations' do
    it { is_expected.to belong_to(:inventory) }

    it { is_expected.to validate_presence_of :name }
    it { is_expected.to validate_presence_of :deadline }
    it { is_expected.to validate_presence_of :inventory }

    context ':assigned_at' do
      before do
        @analysis = Analysis.new(assigned_at: Time.now)
      end

      it 'requires :due_date when assigned_at is present' do
        expect(@analysis.valid?).to eq(false)
        expect(@analysis.errors[:message])
          .to include("can\'t be blank")

        @analysis.assigned_at = nil
        @analysis.valid?
        expect(@analysis.errors[:message])
          .to eq([])
      end
    end
  end

  describe '#save' do
    subject { FactoryGirl.create(:analysis) }

    it { expect(subject.new_record?).to be false }
  end

  describe '#create' do
    let(:inventory) { FactoryGirl.create(:inventory, :with_participants, :with_facilitators, participants: 2, facilitators: 2) }
    subject { FactoryGirl.create(:analysis, inventory: inventory ) }

    it { expect(subject.members.count).to be inventory.members.count }
    it { expect(subject.members.pluck(:role)).to match_array inventory.members.pluck(:role) }
  end
end
