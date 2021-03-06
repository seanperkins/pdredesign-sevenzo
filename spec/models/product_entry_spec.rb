# == Schema Information
#
# Table name: product_entries
#
#  id           :integer          not null, primary key
#  created_at   :datetime
#  updated_at   :datetime
#  inventory_id :integer
#  deleted_at   :datetime
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
end
