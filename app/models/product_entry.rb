# == Schema Information
#
# Table name: product_entries
#
#  id                            :integer          not null, primary key
#  general_inventory_question_id :integer          not null
#  product_question_id           :integer
#  usage_question_id             :integer          not null
#  technical_question_id         :integer          not null
#  created_at                    :datetime
#  updated_at                    :datetime
#

class ProductEntry < ActiveRecord::Base

  has_one :general_inventory_question
  has_one :product_question
  has_one :usage_question
  has_one :technical_question

  validates :general_inventory_question, presence: true
  validates :usage_question, presence: true
  validates :technical_question, presence: true

  default_scope {
    includes(:general_inventory_question, :product_question, :usage_question, :technical_question)
  }
end
