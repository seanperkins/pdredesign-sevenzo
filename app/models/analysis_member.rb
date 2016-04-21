# == Schema Information
#
# Table name: analysis_members
#
#  id           :integer          not null, primary key
#  analysis_id  :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#  invited_at   :datetime
#  role         :string
#

class AnalysisMember < ActiveRecord::Base
  belongs_to :user
  belongs_to :analysis

  validates_presence_of :user
  validates_presence_of :analysis
end
