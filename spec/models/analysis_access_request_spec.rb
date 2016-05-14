# == Schema Information
#
# Table name: analysis_access_requests
#
#  id          :integer          not null, primary key
#  analysis_id :integer          not null
#  user_id     :integer          not null
#  role        :string           not null
#  token       :string
#  created_at  :datetime
#  updated_at  :datetime
#

require 'spec_helper'

describe AnalysisAccessRequest do
  subject { FactoryGirl.create(:analysis_access_request, :as_participant) }
  it { is_expected.to belong_to(:analysis) }
  it { is_expected.to belong_to(:user) }
  it { is_expected.to validate_presence_of :analysis_id }
  it { is_expected.to validate_presence_of :user_id }
  it { is_expected.to validate_presence_of :role }
  it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:analysis_id).with_message('User has already requested access').ignoring_case_sensitivity }
  it { expect(subject.token).not_to be_empty }
end
