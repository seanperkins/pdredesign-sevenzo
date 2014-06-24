# == Schema Information
#
# Table name: participants
#
#  id               :integer          not null, primary key
#  user_id          :integer
#  assessment_id    :integer
#  created_at       :datetime
#  updated_at       :datetime
#  invited_at       :datetime
#  reminded_at      :datetime
#  report_viewed_at :datetime
#

class Participant < ActiveRecord::Base
	belongs_to :user
	belongs_to :assessment
	has_one :response, as: :responder, dependent: :destroy
	validates_uniqueness_of :user_id, scope: :assessment_id

end
