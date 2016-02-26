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

  enum data_type: {
      finance_and_budget: 'Finance & Budget Data',
      pd: 'PD Data',
      hr: 'HR Data',
      student: 'Student Data',
      student_assessment: 'Student Assessment Data',
      stakeholder_survey: 'Stakeholder Survey Data',
      teacher_evaluation: 'Teacher Evaluation Data',
      custom: 'Custom'
  }

  enum data_capture: {
      manually: 'Yes, manually',
      digitally: 'Yes, digitally',
      no: 'No'
  }

end
