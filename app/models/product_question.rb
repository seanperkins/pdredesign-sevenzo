# == Schema Information
#
# Table name: product_questions
#
#  id               :integer          not null, primary key
#  how_its_assigned :text             not null
#  how_its_used     :text             not null
#  how_its_accessed :text             not null
#  audience         :text             not null
#  created_at       :datetime
#  updated_at       :datetime
#

class ProductQuestion < ActiveRecord::Base
end
