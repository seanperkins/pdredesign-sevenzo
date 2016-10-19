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
#  token      :string
#  tool_type  :string
#

class AccessRequest < ActiveRecord::Base
  belongs_to :tool, polymorphic: :true
  belongs_to :user

  validates_presence_of :roles, :user_id, :tool_id, :tool_type

  before_save :ensure_token

  private
  def ensure_token
    self.token ||= SecureRandom.hex(8)
  end
end
