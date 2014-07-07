# == Schema Information
#
# Table name: priorities
#
#  id            :integer          not null, primary key
#  assessment_id :integer
#  order         :integer          is an Array
#  created_at    :datetime
#  updated_at    :datetime
#

class Priority < ActiveRecord::Base
  belongs_to :assessment
  validates_uniqueness_of :assessment_id
  validates :order, presence: true
end
