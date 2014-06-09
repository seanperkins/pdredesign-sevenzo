class Priority < ActiveRecord::Base
  belongs_to :assessment
  validates_uniqueness_of :assessment_id
  validates :order, presence: true
end
