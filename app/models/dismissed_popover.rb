class DismissedPopover < ActiveRecord::Base
  belongs_to :user

  validates :popover_id, presence: true
  validates :user_id, presence: true
  validates :popover_id, uniqueness: { scope: :user_id}

  scope :for_user, -> (user_id) { where(user_id: user_id) }

  def self.seen?(user_id, popover_id) 
    for_user(user_id).where(popover_id: popover_id).present?
  end
end
