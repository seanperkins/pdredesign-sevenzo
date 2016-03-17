# == Schema Information
#
# Table name: inventories
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  deadline    :datetime         not null
#  district_id :integer          not null
#  owner_id    :integer
#

require 'spec_helper'

describe Inventory do
  it { is_expected.to have_many(:product_entries) }
  it { is_expected.to have_many(:data_entries) }
  it { is_expected.to have_many(:access_requests) }
  it { is_expected.to have_many(:facilitators) }
  it { is_expected.to have_many(:participants) }
  it { is_expected.to belong_to(:district) }
  it { is_expected.to belong_to(:owner) }

  it { is_expected.to accept_nested_attributes_for(:product_entries) }
  it { is_expected.to accept_nested_attributes_for(:data_entries) }

  describe '#save' do
    subject { FactoryGirl.create(:inventory) }

    it { expect(subject.new_record?).to be false } 
  end

  describe '#owner?' do
    context 'owner is current user' do
      let(:inventory) { FactoryGirl.create(:inventory) }

      it do
        expect(inventory.owner?(user: inventory.owner)).to be true
      end
    end

    context 'owner is a different user' do
      let(:inventory) { FactoryGirl.create(:inventory) }
      let(:user) { FactoryGirl.create(:user) }

      it do
        expect(inventory.owner?(user: user)).to be false
      end
    end
  end

  describe '#member?' do
    context 'user is member' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_members) }
      let(:user) { inventory.members.first.user }

      it do
        expect(inventory.member?(user: user)).to be true
      end
    end

    context 'user is not member' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_members) }
      let(:user) { FactoryGirl.create(:user) }

      it do
        expect(inventory.member?(user: user)).to be false
      end
    end
  end
end
