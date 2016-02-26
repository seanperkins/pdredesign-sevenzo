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
#

require 'spec_helper'

describe ProductEntry do
  it { is_expected.to have_one(:general_inventory_question) }
  it { is_expected.to have_one(:product_question) }
  it { is_expected.to have_one(:usage_question) }
  it { is_expected.to have_one(:technical_question) }
end
