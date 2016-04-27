# == Schema Information
#
# Table name: analysis_members
#
#  id          :integer          not null, primary key
#  analysis_id :integer
#  user_id     :integer
#  role        :string
#  invited_at  :datetime
#  created_at  :datetime
#  updated_at  :datetime
#

class AnalysisMember < ActiveRecord::Base
  belongs_to :user
  belongs_to :analysis

  validates_presence_of :user
  validates_presence_of :analysis
end
