# == Schema Information
#
# Table name: general_data_questions
#
#  id                          :integer          not null, primary key
#  subcategory                 :string           not null
#  point_of_contact_name       :string           not null
#  point_of_contact_department :string           not null
#  data_capture                :string           not null
#  created_at                  :datetime
#  updated_at                  :datetime
#

class GeneralDataQuestion < ActiveRecord::Base
end
