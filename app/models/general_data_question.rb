# == Schema Information
#
# Table name: general_data_questions
#
#  id                          :integer          not null, primary key
#  data_type                   :string
#  point_of_contact_name       :string
#  point_of_contact_department :string
#  data_capture                :string
#  created_at                  :datetime
#  updated_at                  :datetime
#  data_entry_id               :integer
#

class GeneralDataQuestion < ActiveRecord::Base

  belongs_to :data_entry

  enum data_type_option: {
      finance_and_budget: 'Finance & Budget Data',
      pd: 'PD Data',
      hr: 'HR Data',
      student: 'Student Data',
      student_assessment: 'Student Assessment Data',
      stakeholder_survey: 'Stakeholder Survey Data',
      teacher_evaluation: 'Teacher Evaluation Data'
  }

  enum data_capture_option: {
      manually: 'Yes, manually',
      digitally: 'Yes, digitally',
      no: 'No'
  }

  validates :data_type, inclusion: { in: GeneralDataQuestion.data_type_options.values, message: "'%{value}' not permissible" }, allow_blank: true
  validates :data_capture, inclusion: { in: GeneralDataQuestion.data_capture_options.values, message: "'%{value}' not permissible" }, allow_blank: true

end
