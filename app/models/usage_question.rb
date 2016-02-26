# == Schema Information
#
# Table name: usage_questions
#
#  id           :integer          not null, primary key
#  school_usage :text             not null
#  usage        :text             not null
#  vendor_data  :text             not null
#  notes        :text
#  created_at   :datetime
#  updated_at   :datetime
#

class UsageQuestion < ActiveRecord::Base

end
