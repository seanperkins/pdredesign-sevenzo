# == Schema Information
#
# Table name: analyses
#
#  id              :integer          not null, primary key
#  name            :text
#  deadline        :datetime
#  inventory_id    :integer
#  created_at      :datetime
#  updated_at      :datetime
#  message         :text
#  assigned_at     :datetime
#  rubric_id       :integer
#  owner_id        :integer
#  report_takeaway :text
#  share_token     :string
#

require 'spec_helper'
require_relative './message_migration_concern_spec'

describe Analysis do
  it_behaves_like 'a tool which adds initial messages', described_class.to_s.downcase

  describe 'validations' do
    it { is_expected.to belong_to(:inventory) }
    it { is_expected.to have_one(:response) }
    it { is_expected.to belong_to(:owner) }

    it { is_expected.to validate_presence_of :name }
    it { is_expected.to validate_presence_of :deadline }
    it { is_expected.to validate_presence_of :inventory }
    it { is_expected.to validate_presence_of :rubric }
    it { is_expected.to validate_presence_of :owner }

    context ':assigned_at' do
      before do
        @analysis = Analysis.new(assigned_at: Time.now)
      end

      it 'requires :due_date when assigned_at is present' do
        expect(@analysis.valid?).to eq(false)
        expect(@analysis.errors[:message])
            .to include("can\'t be blank")
      end
    end

    context ':assigned_at' do
      before do
        @analysis = Analysis.new(assigned_at: Time.now)
      end

      it 'requires :due_date when assigned_at is present' do
        expect(@analysis.valid?).to eq(false)
        expect(@analysis.errors[:message])
            .to include("can't be blank")

        @analysis.assigned_at = nil
        @analysis.valid?
        expect(@analysis.errors[:message])
            .to eq([])
      end
    end
  end

  describe 'after the entity is created' do
    context 'when the user creating the analysis is the owner of its parent inventory' do
      let(:owner) {
        create(:user)
      }

      let(:inventory) {
        create(:inventory, :with_participants, :with_facilitators, participants: 2, facilitators: 2, owner: owner)
      }

      subject {
        create(:analysis, inventory: inventory, owner: owner)
      }

      it {
        expect(subject.owner).to equal owner
      }

      it 'does not register the owner as a particpant' do
        expect(subject.participants.map(&:user).include?(owner)).to be false
      end

      it 'registers the owner as a facilitator' do
        expect(subject.facilitators.map(&:user).include?(owner)).to be true
      end
    end

    context 'when the user creating the analysis is a facilitator of its parent inventory' do

      let(:owner) {
        inventory.facilitators.sample.user
      }

      let(:inventory) {
        create(:inventory, :with_participants, :with_facilitators, participants: 2, facilitators: 2)
      }

      subject {
        create(:analysis, inventory: inventory, owner: owner)
      }

      it {
        expect(subject.owner).to equal owner
      }

      it 'copies the user across as a facilitator' do
        expect(subject.facilitators.map(&:user).include?(owner)).to be true
      end

      it 'adds the owner of the original inventory as a facilitator' do
        expect(subject.facilitators.map(&:user).include?(inventory.owner)).to be true
      end
    end

    context 'when the user creating the analysis is a participant of its parent inventory' do
      let(:owner) {
        inventory.participants.sample.user
      }

      let(:inventory) {
        create(:inventory, :with_participants, :with_facilitators, participants: 2, facilitators: 2)
      }

      subject {
        create(:analysis, inventory: inventory, owner: owner)
      }

      it {
        expect(subject.owner).to equal owner
      }

      it 'does not copy the user across as a participant' do
        expect(subject.participants.map(&:user).include?(owner)).to be false
      end

      it 'adds the owner of the original inventory as a facilitator' do
        expect(subject.facilitators.map(&:user).include?(inventory.owner)).to be true
      end

      it 'adds the creator as a facilitator' do
        expect(subject.facilitators.map(&:user).include?(owner)).to be true
      end
    end
  end

  describe 'after the entity is saved' do
    # Inventory has one facilitator - owner
    let(:inventory) {
      create(:inventory)
    }

    context 'when participants are added to the analysis' do
      # Analysis has 2 facilitators - owner and parent inventory owner
      let!(:analysis) {
        create(:analysis, :with_participants, participants: 5, inventory: inventory)
      }

      before(:each) do
        inventory.reload
      end

      it 'copies the participants over as participants on the inventory' do
        expect(inventory.participants.map(&:user).map(&:id) & analysis.participants.map(&:user).map(&:id))
            .to match_array(analysis.participants.map(&:user).map(&:id))
      end

      it 'copies the facilitators over as participants on the inventory' do
        expect(inventory.participants.map(&:user).map(&:id) & analysis.facilitators.map(&:user).map(&:id))
            .to match_array(analysis.facilitators.map(&:user).map(&:id))
      end
    end
  end
end
