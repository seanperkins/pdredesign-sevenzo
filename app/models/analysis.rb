# == Schema Information
#
# Table name: analyses
#
#  id           :integer          not null, primary key
#  name         :text
#  deadline     :datetime
#  inventory_id :integer
#  created_at   :datetime
#  updated_at   :datetime
#  message      :text
#

class Analysis < ActiveRecord::Base
  include Authority::Abilities
  self.authorizer_name = 'AnalysisAuthorizer'

  belongs_to :inventory

  validates_presence_of :name, :deadline, :inventory

  has_many :members, class_name:'AnalysisMember'
  has_many :participants, -> { where(role: 'participant') }, class_name:'AnalysisMember'
  has_many :facilitators, -> { where(role: 'facilitator') }, class_name:'AnalysisMember'
end
