class AccessRequest < ActiveRecord::Base
  belongs_to :assessment
  belongs_to :user

  validates :roles, presence: true
  validates :user_id, presence: true
  validates :assessment_id, presence: true
end
