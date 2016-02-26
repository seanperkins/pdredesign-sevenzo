# == Schema Information
#
# Table name: inventories
#
#  id               :integer          not null, primary key
#  name             :string
#  deadline         :datetime
#  districts_id     :integer
#  product_entry_id :integer          not null
#  data_entry_id    :integer          not null
#

class Inventory < ActiveRecord::Base
end
