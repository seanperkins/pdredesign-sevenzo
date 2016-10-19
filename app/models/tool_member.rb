# == Schema Information
#
# Table name: tool_members
#
#  tool_type   :string
#  tool_id     :integer
#  role        :integer
#  user_id     :integer          not null
#  invited_at  :datetime
#  reminded_at :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  response_id :integer
#  id          :integer          not null, primary key
#  roles       :integer          default([]), is an Array
#

class ToolMember < ActiveRecord::Base
  include Authority::Abilities
  include ActiveModel::Validations

  belongs_to :user
  belongs_to :tool, polymorphic: true

  has_one :response, as: :responder

  enum member_role: {
      facilitator: 0,
      participant: 1
  }

  validates_uniqueness_of :user_id, scope: [:tool_id, :tool_type]
  validates :roles, role: true
  validates_presence_of :roles
end
