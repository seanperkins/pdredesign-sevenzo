class AssessmentAuthorizer < ApplicationAuthorizer
  def readable_by?(user)
    return true  if     participant?(user) 
    return false unless facilitator?(user)
    return true  if     share_districts?(user) 
    return true  if     owner?(user)
    false
  end

  def creatable_by?(user)
    true
  end

  def updatable_by?(user)
    owner?(user)
  end

  def deletable_by?(user)
    facilitator?(user) || owner?(user)
  end

  def participants_listable_by?(user)
    share_districts?(user)
  end

end
