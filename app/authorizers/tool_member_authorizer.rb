class ToolMemberAuthorizer < ApplicationAuthorizer
  include MembershipHelper

  def readable_by?(user)
    MembershipHelper.member?(resource.tool, user) || MembershipHelper.facilitator?(resource.tool, user)
  end

  def creatable_by?(user)
    MembershipHelper.facilitator?(resource.tool, user)
  end

  def updatable_by?(user)
    MembershipHelper.facilitator?(resource.tool, user)
  end

  def deletable_by?(user)
    MembershipHelper.facilitator?(resource.tool, user)
  end
end