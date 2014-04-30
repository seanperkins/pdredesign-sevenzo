# == Schema Information
#
# Table name: scores
#
#  id          :integer          not null, primary key
#  value       :integer
#  evidence    :text
#  response_id :integer
#  question_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#

class Score < ActiveRecord::Base
	belongs_to :response
	belongs_to :question

	## Make sure the user can't leave blank evidence after submitting response
	before_update do |score|
		if score.evidence.blank? && score.value.present?
	 		score.value = nil
	 		score.evidence = nil
	 	end
	end

end
