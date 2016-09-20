# == Schema Information
#
# Table name: access_requests
#
#  id            :integer          not null, primary key
#  assessment_id :integer
#  user_id       :integer
#  roles         :string           default([]), is an Array
#  created_at    :datetime
#  updated_at    :datetime
#  token         :string(255)
#

require 'spec_helper'

describe AccessRequest do

  it {
    is_expected.to belong_to :assessment
  }

  it {
    is_expected.to belong_to :user
  }

  it {
    is_expected.to validate_presence_of :roles
  }

  it {
    is_expected.to validate_presence_of :user_id
  }

  it {
    is_expected.to validate_presence_of :assessment_id
  }

  describe '#before_destroy' do
    let(:access_request) {
      create(:access_request)
    }

    it {
      expect(access_request.assessment).to receive :flush_cached_version
      access_request.destroy
    }
  end

  context '#after_create' do
    let(:access_request) {
      build(:access_request)
    }

    it {
      expect(access_request.assessment).to receive :flush_cached_version
      access_request.save
    }
  end
end
