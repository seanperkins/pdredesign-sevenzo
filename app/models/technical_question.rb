# == Schema Information
#
# Table name: technical_questions
#
#  id             :integer          not null, primary key
#  platform       :text             not null
#  hosting        :text             not null
#  connectivity   :text             not null
#  single_sign_on :text             not null
#  created_at     :datetime
#  updated_at     :datetime
#

class TechnicalQuestion < ActiveRecord::Base

end
