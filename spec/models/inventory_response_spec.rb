# == Schema Information
#
# Table name: inventory_responses
#
#  id                  :integer          not null, primary key
#  inventory_member_id :integer          not null
#  submitted_at        :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'spec_helper'

describe InventoryResponse do

  it { is_expected.to belong_to(:inventory_member) }

  context 'when saving' do
    let(:inventory_member) {
      create(:inventory_member)
    }

    let(:inventory) {
      inventory_member.inventory
    }

    let(:subject) {
      InventoryResponse.create(inventory_member: inventory_member)
    }

    context 'when submitted_at is not present' do
      before(:each) do
        subject.save!
      end

      it 'does not increment the participant responses on its parent inventory' do
        expect(inventory.total_participant_responses).to eq 0
      end
    end

    context 'when submitted_at is present' do
      before(:each) do
        subject.submitted_at = Time.now
        subject.save!
      end

      it 'increments the participant responses count on its parent inventory' do
        expect(inventory.total_participant_responses).to eq 1
      end
    end
  end

  context 'when destroying' do
    let(:subject) {
      create(:inventory_response)
    }

    let(:inventory) {
      subject.inventory_member.inventory
    }

    context 'when submitted_at is not present' do
      before(:each) do
        subject.submitted_at = 5.days.ago
        subject.save!
        subject.submitted_at = nil
        subject.save!
        subject.destroy!
      end

      it 'does not decrement the count on its parent inventory' do
        expect(inventory.total_participant_responses).to eq 1
      end
    end

    context 'when submitted_at is present' do
      before(:each) do
        subject.submitted_at = 5.days.ago
        subject.save!
        subject.destroy!
      end

      it 'decrements the count on its parent inventory' do
        expect(inventory.total_participant_responses).to eq 0
      end
    end
  end
end