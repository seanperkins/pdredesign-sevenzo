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
#

class ToolMember < ActiveRecord::Base
  belongs_to :user
  belongs_to :tool, polymorphic: true

  enum member_role: {
      facilitator: 0,
      participant: 1
  }

  validates_inclusion_of :role, in: ToolMember.member_roles.values
  validates_uniqueness_of :role, scope: [:user_id, :tool_id, :tool_type]

  self.primary_keys = [:tool_type, :tool_id, :user_id, :role]
end
