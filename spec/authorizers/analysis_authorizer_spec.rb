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
end


