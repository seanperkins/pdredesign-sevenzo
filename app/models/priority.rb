# == Schema Information
#
# Table name: priorities
#
#  id         :integer          not null, primary key
#  tool_id    :integer
#  order      :integer          is an Array
#  created_at :datetime
#  updated_at :datetime
#  tool_type  :string
#

class Priority < ActiveRecord::Base
  belongs_to :tool, polymorphic: true
  validates_uniqueness_of :tool_id, scope: :tool_type
  validates_presence_of :order
  validates_presence_of :tool
end
