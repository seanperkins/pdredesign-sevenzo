# == Schema Information
#
# Table name: access_requests
#
#  id         :integer          not null, primary key
#  tool_id    :integer
#  user_id    :integer
#  roles      :string           default([]), is an Array
#  created_at :datetime
#  updated_at :datetime
#  token      :string(255)
#  tool_type  :string
#

require 'spec_helper'

describe AccessRequest do

  it {
    is_expected.to belong_to :tool
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
    is_expected.to validate_presence_of :tool_id
  }

  it {
    is_expected.to validate_presence_of :tool_type
  }

  it {
    is_expected.to validate_presence_of :token
  }
end
