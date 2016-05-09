require 'spec_helper'

describe AnalysisAuthorizer do

  let(:subject) { AnalysisAuthorizer }
  let(:member_user) { FactoryGirl.create(:user, :with_district) }
  let(:participant_user) { FactoryGirl.create(:user, :with_district) }
  let(:facilitator_user) { FactoryGirl.create(:user, :with_district) }
  let(:other_user) { FactoryGirl.create(:user, :with_district) }
  let(:inventory) { FactoryGirl.create(:inventory, :with_product_entries) }

  before do
    @analysis = FactoryGirl.create(:analysis, inventory: inventory)
    FactoryGirl.create(:inventory_member, user: member_user, inventory: inventory)
    FactoryGirl.create(:inventory_member, :as_participant, user: participant_user, inventory: inventory)
    FactoryGirl.create(:inventory_member, :as_facilitator, user: facilitator_user, inventory: inventory)
  end

  context 'read' do
    it "is readable by its inventory's owner" do
      expect(@analysis).to be_readable_by(inventory.owner)
    end

    it "is not readable by its inventory's members" do
      expect(@analysis).to_not be_readable_by(member_user)
    end

    it "is not readable by its inventory's participants" do
      expect(@analysis).to_not be_readable_by(participant_user)
    end

    it "is readable by its inventory's facilitators" do
      expect(@analysis).to be_readable_by(facilitator_user)
    end

    it 'is not readable by randos' do
      expect(@analysis).to_not be_readable_by(other_user)
    end
  end

  context 'create' do
    it "is creatable by its inventory's owner" do
      expect(@analysis).to be_creatable_by(inventory.owner)
    end

    it "is not creatable by its inventory's members" do
      expect(@analysis).to_not be_creatable_by(member_user)
    end

    it "is not creatable by its inventory's participants" do
      expect(@analysis).to_not be_creatable_by(participant_user)
    end

    it "is creatable by its inventory's facilitators" do
      expect(@analysis).to be_creatable_by(facilitator_user)
    end

    it 'is not creatable by randos' do
      expect(@analysis).to_not be_creatable_by(other_user)
    end
  end

  context 'update' do
    it "is updatable by its inventory's owner" do
      expect(@analysis).to be_updatable_by(inventory.owner)
    end

    it "is not updatable by its inventory's members" do
      expect(@analysis).to_not be_updatable_by(member_user)
    end

    it "is not updatable by its inventory's participants" do
      expect(@analysis).to_not be_updatable_by(participant_user)
    end

    it "is updatable by its inventory's facilitators" do
      expect(@analysis).to be_updatable_by(facilitator_user)
    end

    it 'is not updatable by randos' do
      expect(@analysis).to_not be_updatable_by(other_user)
    end
  end

  context 'delete' do
    it "is deletable by its inventory's owner" do
      expect(@analysis).to be_deletable_by(inventory.owner)
    end

    it "is not deletable by its inventory's members" do
      expect(@analysis).to_not be_deletable_by(member_user)
    end

    it "is not deletable by its inventory's participants" do
      expect(@analysis).to_not be_deletable_by(participant_user)
    end

    it "is deletable by its inventory's facilitators" do
      expect(@analysis).to be_deletable_by(facilitator_user)
    end

    it 'is not deletable by randos' do
      expect(@analysis).to_not be_deletable_by(other_user)
    end
  end
end


