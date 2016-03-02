# == Schema Information
#
# Table name: inventories
#
#  id               :integer          not null, primary key
#  name             :string           not null
#  deadline         :datetime         not null
#  district_id      :integer          not null
#  product_entry_id :integer
#  data_entry_id    :integer
#

require 'spec_helper'

describe Inventory do
  it { is_expected.to have_one(:product_entry) }
  it { is_expected.to have_one(:data_entry) }
  it { is_expected.to belong_to(:district) }

  it { is_expected.to accept_nested_attributes_for(:product_entry) }
  it { is_expected.to accept_nested_attributes_for(:data_entry) }

  describe '#save' do
    subject { FactoryGirl.create(:inventory) }

    it { expect(subject.new_record?).to be false } 
  end
end
