# == Schema Information
#
# Table name: access_requests
#
#  id            :integer          not null, primary key
#  assessment_id :integer
#  user_id       :integer
#  roles         :string(255)      default([]), is an Array
#  created_at    :datetime
#  updated_at    :datetime
#  token         :string(255)
#

require 'spec_helper'

describe AccessRequest do

  context "#after_destroy" do
    before { create_magic_assessments }
    let(:assessment) { @assessment_with_participants }
    let(:user_requesting_access) { Application.create_user }
    let(:access_request){ Application.request_access_to_assessment(assessment: assessment, user: user_requesting_access, roles: ["facilitator"]) }

    it "should flush_cached_version to the assessment when the access is granted" do
      expect(assessment).to receive(:flush_cached_version)
      access_request.destroy
    end
  end

end

