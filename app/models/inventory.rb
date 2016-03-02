# == Schema Information
#
# Table name: inventories
#
#  id               :integer          not null, primary key
#  name             :string           not null
#  deadline         :datetime         not null
#  district_id      :integer          not null
#  product_entry_id :integer          not null
#  data_entry_id    :integer          not null
#

class Inventory < ActiveRecord::Base
  belongs_to :product_entry
  belongs_to :data_entry
  belongs_to :district

  accepts_nested_attributes_for :product_entry
  accepts_nested_attributes_for :data_entry

  default_scope {
    includes(:product_entry, :data_entry)
  }
end
