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

  enum data_accessed_by: {
      team: 'Team',
      central_office: 'Central Office',
      school_district: 'School District',
      public_access: 'Public',
      other: 'Other'
  }

end
