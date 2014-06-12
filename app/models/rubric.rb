# == Schema Information
#
# Table name: rubrics
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  version    :decimal(, )
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#  enabled    :boolean
#

class Rubric < ActiveRecord::Base
	belongs_to :user
	has_many :assessments
	has_many :responses, dependent: :destroy
	has_many :feedbacks

	has_and_belongs_to_many :questions
  has_many :categories, -> { uniq }, through: :questions

	accepts_nested_attributes_for :questions

	scope :enabled, -> { where(enabled: true) }

  def versioned_name
    "#{name} v#{version}"
  end
end
