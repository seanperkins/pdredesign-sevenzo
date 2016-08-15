# == Schema Information
#
# Table name: technical_questions
#
#  id               :integer          not null, primary key
#  platforms        :text             default([]), is an Array
#  hosting          :text
#  connectivity     :integer          default([]), is an Array
#  single_sign_on   :text
#  created_at       :datetime
#  updated_at       :datetime
#  product_entry_id :integer
#  deleted_at       :datetime
#

require 'spec_helper'

describe TechnicalQuestion do

  it { is_expected.to belong_to(:product_entry) }

  it { is_expected.to allow_value(['foo']).for(:platforms) }
  it { is_expected.to allow_value([TechnicalQuestion.platform_options.values.first]).for(:platforms) }
  it { is_expected.to_not allow_value(['foo','bar']).for(:platforms) }

  it { is_expected.to allow_value(TechnicalQuestion.hosting_options.values.first).for(:hosting) }
  it { is_expected.to_not allow_value('foo').for(:hosting) }

  it { is_expected.to allow_value(TechnicalQuestion.single_sign_on_options.values.first).for(:single_sign_on) }
  it { is_expected.to_not allow_value('foo').for(:single_sign_on) }

  describe '#save' do
    subject { FactoryGirl.create(:technical_question) }

    it { expect(subject.new_record?).to be false }
  end
end
