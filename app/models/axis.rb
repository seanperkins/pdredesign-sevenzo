# == Schema Information
#
# Table name: axes
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#

class Axis < ActiveRecord::Base
  has_many :categories
end
