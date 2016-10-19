class AnalysisAuthorizer < ApplicationAuthorizer
  def readable_by?(user)
    resource.member?(user)
  end

  def creatable_by?(_)
    true
  end

  def updatable_by?(user)
    resource.facilitator?(user)
  end

  def deletable_by?(user)
    resource.facilitator?(user)
  end
end
