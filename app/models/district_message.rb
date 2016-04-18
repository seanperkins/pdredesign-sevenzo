# == Schema Information
#
# Table name: district_messages
#
#  id           :integer          not null, primary key
#  name         :string
#  address      :string
#  sender_name  :string
#  sender_email :string
#  created_at   :datetime
#  updated_at   :datetime
#

class DistrictMessage < ActiveRecord::Base
  validates :name, presence: true
  validates :address, presence: true
  validates :sender_name, presence: true
  validates :sender_email, presence: true
end
