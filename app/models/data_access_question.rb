# == Schema Information
#
# Table name: data_access_questions
#
#  id                   :integer          not null, primary key
#  data_storage         :string           not null
#  who_access_data      :string           not null
#  how_data_is_accessed :string           not null
#  why_data_is_accessed :string           not null
#  notes                :string
#  created_at           :datetime
#  updated_at           :datetime
#

class DataAccessQuestion < ActiveRecord::Base
end
