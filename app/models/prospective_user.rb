# == Schema Information
#
# Table name: prospective_users
#
#  id         :integer          not null, primary key
#  email      :string(255)      default(""), not null
#  district   :string(255)
#  team_role  :string(255)
#  name       :string(255)
#  ip_address :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class ProspectiveUser < ActiveRecord::Base
  validates :email, 
            format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i },
            uniqueness: true
end
