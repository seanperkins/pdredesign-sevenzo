require 'spec_helper'

describe InventoryAuthorizer do
  let(:inventory) {
    create(:inventory, :with_facilitators, :with_participants)
  }

  let(:user) {
    create(:user)
  }

  subject {
    inventory.authorizer
  }

  describe '#creatable_by?' do
    context 'when the user is not a member of the inventory' do
      it {
        is_expected.to be_creatable_by(user)
      }
    end

    context 'when the user is a facilitator of the inventory' do
      let(:facilitator_user) {
        inventory.facilitators.first.user
      }

      it {
        is_expected.to be_creatable_by(facilitator_user)
      }
    end

    context 'when the user is a participant of the inventory' do
      let(:participant_user) {
        inventory.participants.first.user
      }

      it {
        is_expected.to be_creatable_by(participant_user)
      }
    end
  end

  describe '#updatable_by?' do
    context 'when the user is not a member of the inventory' do
      it {
        is_expected.not_to be_updatable_by(user)
      }
    end

    context 'when the user is a participant of the inventory' do
      let(:participant_user) {
        inventory.participants.first.user
      }

      it {
        is_expected.not_to be_updatable_by(participant_user)
      }
    end

    context 'when the user is a facilitator of the inventory' do
      let(:facilitator_user) {
        inventory.facilitators.first.user
      }

      it {
        is_expected.to be_updatable_by(facilitator_user)
      }
    end
  end

  describe '#readable_by?' do
    context 'when the user is not a member of the inventory' do

      it {
        is_expected.not_to be_readable_by(user)
      }
    end

    context 'when the user is a participant of the inventory' do
      let(:participant_user) {
        inventory.participants.first.user
      }

      it {
        is_expected.to be_readable_by(participant_user)
      }
    end

    context 'when the user is a facilitator of the inventory' do
      let(:facilitator_user) {
        inventory.facilitators.first.user
      }

      it {
        is_expected.to be_readable_by(facilitator_user)
      }
    end
  end

  describe '#deletable_by?' do
    context 'when the user is not a member of the inventory' do
      it {
        is_expected.not_to be_deletable_by(user)
      }
    end

    context 'when the user is a facilitator of the inventory' do
      let(:facilitator_user) {
        inventory.facilitators.first.user
      }

      it {
        is_expected.to be_deletable_by(facilitator_user)
      }
    end

    context 'when the user is a participant of the inventory' do
      let(:participant_user) {
        inventory.participants.first.user
      }

      it {
        is_expected.not_to be_deletable_by(participant_user)
      }
    end
  end
end
