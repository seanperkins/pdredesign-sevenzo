# == Schema Information
#
# Table name: general_data_questions
#
#  id                          :integer          not null, primary key
#  data_type                   :text
#  point_of_contact_name       :text
#  point_of_contact_department :text
#  data_capture                :text
#  created_at                  :datetime
#  updated_at                  :datetime
#  data_entry_id               :integer
#  deleted_at                  :datetime
#

require 'spec_helper'

describe GeneralDataQuestion do
  it { is_expected.to belong_to(:data_entry) }
  it { is_expected.to_not allow_value('foo').for(:data_type) }
  it { is_expected.to allow_value(GeneralDataQuestion.data_type_options.values.first).for(:data_type) }
  it { is_expected.to_not allow_value('foo').for(:data_capture) }
  it { is_expected.to allow_value(GeneralDataQuestion.data_capture_options.values.first).for(:data_capture) }

  describe '#save' do
    subject { FactoryGirl.create(:general_data_question) }

    it { expect(subject.new_record?).to be false }
  end
end
