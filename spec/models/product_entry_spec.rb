# == Schema Information
#
# Table name: product_entries
#
#  id           :integer          not null, primary key
#  created_at   :datetime
#  updated_at   :datetime
#  inventory_id :integer
#

require 'spec_helper'

describe ProductEntry do
  it { is_expected.to have_one(:general_inventory_question) }
  it { is_expected.to have_one(:product_question) }
  it { is_expected.to have_one(:usage_question) }
  it { is_expected.to have_one(:technical_question) }

  it { is_expected.to belong_to(:inventory) }

  it { is_expected.to validate_presence_of(:general_inventory_question) }
  it { is_expected.to validate_presence_of(:usage_question) }
  it { is_expected.to validate_presence_of(:technical_question) }

  it { is_expected.to accept_nested_attributes_for(:general_inventory_question) }
  it { is_expected.to accept_nested_attributes_for(:product_question) }
  it { is_expected.to accept_nested_attributes_for(:usage_question) }
  it { is_expected.to accept_nested_attributes_for(:technical_question) }

  describe '#save' do
    subject { FactoryGirl.create(:product_entry) }

    it { expect(subject.new_record?).to be false }
  end

  describe 'for district' do
    let(:district1) { FactoryGirl.create(:district) }
    let(:district2) { FactoryGirl.create(:district) }
    it 'returns inventories from the district of a certain inventory_id' do
      district1_inventory1 = FactoryGirl.create(:inventory, district: district1)
      district1_inventory2 = FactoryGirl.create(:inventory, district: district1)
      FactoryGirl.create(:inventory)

      district1_inventory1_product_entry1 = FactoryGirl.create(:product_entry, inventory: district1_inventory1)
      district1_inventory1_product_entry2 = FactoryGirl.create(:product_entry, inventory: district1_inventory1)
      district1_inventory2_product_entry1 = FactoryGirl.create(:product_entry, inventory: district1_inventory2)
      district1_inventory2_product_entry2 = FactoryGirl.create(:product_entry, inventory: district1_inventory2)

      FactoryGirl.create(:product_entry)

      expect(ProductEntry.for_district(district1_inventory1.id)).to match_array([
        district1_inventory1_product_entry1,
        district1_inventory1_product_entry2,
        district1_inventory2_product_entry1,
        district1_inventory2_product_entry2
      ])
    end
  end
end
