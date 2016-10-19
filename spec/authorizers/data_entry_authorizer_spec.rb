require 'spec_helper'

describe DataEntryAuthorizer do

  let(:subject) { DataEntryAuthorizer }
  let(:member_user) { create(:user, :with_district) }
  let(:participant_user) { create(:user, :with_district) }
  let(:facilitator_user) { create(:user, :with_district) }
  let(:other_user) { create(:user, :with_district) }
  let(:inventory) { create(:inventory, :with_data_entries) }

  before do
    @data_entry = inventory.data_entries.last
    create(:tool_member, :as_participant, user: member_user, tool: inventory)
    create(:tool_member, :as_participant, user: participant_user, tool: inventory)
    create(:tool_member, :as_facilitator, user: facilitator_user, tool: inventory)
  end

  context 'read' do
    it "is readable by its inventory's owner" do
      expect(@data_entry).to be_readable_by(inventory.owner)
    end

    it "is readable by its inventory's members" do
      expect(@data_entry).to be_readable_by(member_user)
    end

    it "is readable by its inventory's participants" do
      expect(@data_entry).to be_readable_by(participant_user)
    end

    it "is readable by its inventory's facilitators" do
      expect(@data_entry).to be_readable_by(facilitator_user)
    end

    it 'is not readable by rando user' do
      expect(@data_entry).not_to be_readable_by(other_user)
    end
  end

  context 'create' do
    it "is creatable by its inventory's owner" do
      expect(@data_entry).to be_creatable_by(inventory.owner)
    end

    it "is creatable by its inventory's members" do
      expect(@data_entry).to be_creatable_by(member_user)
    end

    it "is creatable by its inventory's participants" do
      expect(@data_entry).to be_creatable_by(participant_user)
    end

    it "is creatable by its inventory's facilitators" do
      expect(@data_entry).to be_creatable_by(facilitator_user)
    end

    it 'is not creatable by randos' do
      expect(@data_entry).to_not be_creatable_by(other_user)
    end
  end

  context 'update' do
    it "is updatable by its inventory's owner" do
      expect(@data_entry).to be_updatable_by(inventory.owner)
    end

    it "is updatable by its inventory's members" do
      expect(@data_entry).to be_updatable_by(member_user)
    end

    it "is updatable by its inventory's participants" do
      expect(@data_entry).to be_updatable_by(participant_user)
    end

    it "is updatable by its inventory's facilitators" do
      expect(@data_entry).to be_updatable_by(facilitator_user)
    end

    it 'is not updatable by randos' do
      expect(@data_entry).to_not be_updatable_by(other_user)
    end
  end
end
