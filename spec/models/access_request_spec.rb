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
end

