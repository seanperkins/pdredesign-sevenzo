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
end
