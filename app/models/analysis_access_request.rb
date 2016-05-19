# == Schema Information
#
# Table name: analysis_access_requests
#
#  id          :integer          not null, primary key
#  analysis_id :integer          not null
#  user_id     :integer          not null
#  role        :string           not null
#  token       :string
#  created_at  :datetime
#  updated_at  :datetime
#

class AnalysisAccessRequest < ActiveRecord::Base
  belongs_to :analysis
  belongs_to :user

  validates :analysis_id, presence: true
  validates :user_id, presence: true
  validates :role, presence: true
  validates :user_id, uniqueness: { scope: :analysis_id, message: 'User has already requested access' }
  before_create :ensure_token

  private
  def ensure_token
    self.token ||= SecureRandom.hex(8)
  end
end
