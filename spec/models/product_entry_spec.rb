# == Schema Information
#
# Table name: product_entries
#
#  id                            :integer          not null, primary key
#  general_inventory_question_id :integer          not null
#  product_question_id           :integer
#  usage_question_id             :integer          not null
#  technical_question_id         :integer          not null
#  created_at                    :datetime
#  updated_at                    :datetime
#  inventory_id                  :integer
#

require 'spec_helper'

describe ProductEntry do
  it { is_expected.to belong_to(:general_inventory_question) }
  it { is_expected.to belong_to(:product_question) }
  it { is_expected.to belong_to(:usage_question) }
  it { is_expected.to belong_to(:technical_question) }

  it { is_expected.to belong_to(:inventory) }

  it { is_expected.to validate_presence_of(:general_inventory_question) }
  it { is_expected.to validate_presence_of(:usage_question) }
  it { is_expected.to validate_presence_of(:technical_question) }

  it { is_expected.to accept_nested_attributes_for(:general_inventory_question) }
  it { is_expected.to accept_nested_attributes_for(:product_question) }
  it { is_expected.to accept_nested_attributes_for(:usage_question) }
  it { is_expected.to accept_nested_attributes_for(:technical_question) }
end
