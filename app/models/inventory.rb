# == Schema Information
#
# Table name: inventories
#
#  id               :integer          not null, primary key
#  name             :string           not null
#  deadline         :datetime         not null
#  districts_id     :integer          not null
#  product_entry_id :integer          not null
#  data_entry_id    :integer          not null
#

class Inventory < ActiveRecord::Base

  default_scope {
    includes(:product_entry, :data_entry)
  }

end
