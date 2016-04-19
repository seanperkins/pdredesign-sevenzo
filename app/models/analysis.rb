# == Schema Information
#
# Table name: analyses
#
#  id           :integer          not null, primary key
#  name         :text
#  deadline     :datetime
#  created_at   :datetime
#  updated_at   :datetime
#  inventory_id :integer
#

class Analysis < ActiveRecord::Base
  include Authority::Abilities
  self.authorizer_name = 'AnalysisAuthorizer'

  belongs_to :inventory

  validates_presence_of :name, :deadline, :inventory
end
