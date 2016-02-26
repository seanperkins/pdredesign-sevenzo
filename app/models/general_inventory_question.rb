# == Schema Information
#
# Table name: general_inventory_questions
#
#  id                          :integer          not null, primary key
#  product_name                :text             not null
#  vendor                      :text             not null
#  point_of_contact_name       :text             not null
#  point_of_contact_department :text             not null
#  pricing_structure           :text             not null
#  price                       :decimal(9, 2)    not null
#  type                        :text             not null
#  purpose                     :text             not null
#  created_at                  :datetime
#  updated_at                  :datetime
#

class GeneralInventoryQuestion < ActiveRecord::Base

end
