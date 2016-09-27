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

class AccessRequest < ActiveRecord::Base
  belongs_to :tool, polymorphic: :true
  belongs_to :user

  validates :roles, presence: true
  validates :user_id, presence: true
  validates :tool_id, presence: true
  validates :tool_type, presence: true
end
