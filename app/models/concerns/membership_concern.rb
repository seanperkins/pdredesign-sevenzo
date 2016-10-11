require 'active_support/concern'

module MembershipConcern
  extend ActiveSupport::Concern
  include MembershipHelper

  def member?(user)
    MembershipHelper.member?(self, user)
  end

  def participant?(user)
    MembershipHelper.participant?(self, user)
  end

  def facilitator?(user)
    MembershipHelper.facilitator?(self, user)
  end

  def network_partner?(user)
    MembershipHelper.network_partner?(self, user)
  end
end