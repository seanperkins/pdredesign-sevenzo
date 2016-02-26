# == Schema Information
#
# Table name: data_entries
#
#  id                       :integer          not null, primary key
#  general_data_question_id :integer          not null
#  data_entry_question_id   :integer          not null
#  data_access_question_id  :integer          not null
#  created_at               :datetime
#  updated_at               :datetime
#

class DataEntry < ActiveRecord::Base

  has_one :general_data_question
  has_one :data_entry_question
  has_one :data_access_question

  validates :general_data_question, presence: true

  default_scope {
    includes(:general_data_question, :data_entry_question, :data_access_question)
  }
end
