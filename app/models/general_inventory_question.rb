# == Schema Information
#
# Table name: general_inventory_questions
#
#  id                                                              :integer          not null, primary key
#  product_name                                                    :text
#  vendor                                                          :text
#  point_of_contact_name                                           :text
#  point_of_contact_department                                     :text
#  pricing_structure                                               :text
#  price                                                           :decimal(9, 2)
#  type                                                            :text             is an Array
#  created_at                                                      :datetime
#  updated_at                                                      :datetime
#  purpose                                                         :text
#  #<ActiveRecord::ConnectionAdapters::PostgreSQL::TableDefinition :text
#

class GeneralInventoryQuestion < ActiveRecord::Base

  enum product_types: {
      academic_content: 'PD for Academic Content',
      instructional_skills: 'PD for Instructional Skills',
      pedagogies: 'PD for Pedagogies',
      curriculum_products: 'Curriculum Products',
      teacher_classroom_needs: 'Teacher Classroom Needs',
      human_resources: 'Human Resources'
  }


end
