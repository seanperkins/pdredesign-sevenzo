# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  axis_id    :integer
#

class Category < ActiveRecord::Base
  belongs_to :axis
	has_many :questions
end