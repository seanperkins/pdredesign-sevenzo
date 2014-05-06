class AssessmentAuthorizer < ApplicationAuthorizer
  def readable_by?(user)
    return true  if     participant?(user) 
    return false unless facilitator?(user)
    return true  if     share_districts?(user) 
    return true  if     owner?(user)
    false
  end

  def creatable_by?(user)
    facilitator?(user)
  end

  def updatable_by?(user)
    owner?(user)
  end

  def deletable_by?(user)
    owner?(user)
  end

  def participants_listable_by?(user)
    share_districts?(user)
  end

  protected
  def facilitator?(user)
    user.role.to_sym == :facilitator
  end

  def participant?(user)
    user_participant_ids = user.participants.pluck(:id)       
    resource.participant_ids.any? do |pid|
      user_participant_ids.include? pid
    end
  end

  def share_districts?(user)
    user.district_ids.include?(resource.district_id)
  end

  def owner?(user)
    user.id && resource.user.id == user.id
  end
end
