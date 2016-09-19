class ToolMemberAuthorizer < ApplicationAuthorizer
  include MembershipHelper

  def readable_by?(user)
    MembershipHelper.member?(resource, user) || MembershipHelper.facilitator?(resource, user)
  end

  def creatable_by?(user)
    MembershipHelper.facilitator?(resource, user)
  end

  def updatable_by?(user)
    MembershipHelper.facilitator?(resource, user)
  end

  def deletable_by?(user)
    MembershipHelper.facilitator?(resource, user)
  end
end