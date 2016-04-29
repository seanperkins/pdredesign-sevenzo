# == Schema Information
#
# Table name: supporting_inventory_responses
#
#  id                     :integer          not null, primary key
#  score_id               :integer
#  product_entries        :integer          default([]), not null, is an Array
#  data_entries           :integer          default([]), not null, is an Array
#  product_entry_evidence :text
#  data_entry_evidence    :text
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class SupportingInventoryResponse < ActiveRecord::Base
  belongs_to :score
end
