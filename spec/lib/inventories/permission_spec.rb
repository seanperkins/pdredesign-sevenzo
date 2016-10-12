require 'spec_helper'

describe Inventories::Permission do
  describe "#role" do
    context "as participant" do
      let(:inventory) { create(:inventory, :with_participants) }
      let(:participant_user) { inventory.participants.first.user }
      subject { Inventories::Permission.new(inventory: inventory, user: participant_user) }

      it { expect(subject.role).to eq ['participant'] }
    end

    context "as facilitator" do
      let(:inventory) { create(:inventory, :with_facilitators) }
      let(:facilitator_user) { inventory.facilitators.first.user }
      subject { Inventories::Permission.new(inventory: inventory, user: facilitator_user) }

      it { expect(subject.role).to eq ['facilitator'] }
    end

    describe "role=" do
      context "as new user" do
        let(:inventory) { create(:inventory) }
        let(:user) { create(:user) }
        subject { Inventories::Permission.new(inventory: inventory, user: user) }

        before(:each) do
          subject.role= 'facilitator'
        end

        it { expect(subject.role).to eq ['facilitator'] }
      end

      context "as existing member" do
        let(:inventory) { create(:inventory, :with_participants) }
        let(:existing_user) { inventory.participants.first.user }
        subject { Inventories::Permission.new(inventory: inventory, user: existing_user) }

        before(:each) do
          allow(InventoryAccessGrantedNotificationWorker).to receive(:perform_async)
          subject.role= 'facilitator'
        end

        it { expect(subject.role).to eq ['facilitator'] }
        it { expect(InventoryAccessGrantedNotificationWorker).to have_received(:perform_async).with(inventory.id, existing_user.id, 'facilitator') }
      end
    end
  end
end
