class ResponseAuthorizer < ApplicationAuthorizer
  def creatable_by?(user)
    return false unless resource.responder
    is_facilitator_or_owner(user)
  end

  def updatable_by?(user)
    is_facilitator_or_owner(user)
  end

  def readable_by?(user)
    return false unless resource.responder
    return true if %w(Assessment Analysis).include? resource.responder_type
    resource.responder.user_id == user.id
  end

  private
  def is_facilitator_or_owner(user)
    if resource.responder
      if resource.responder_type == 'Assessment'
        resource.responder.facilitator?(user)
      elsif resource.responder_type == 'Analysis'
        is_member(user)
      end
    else
      resource.responder.user_id == user.id
    end
  end

  def is_member(user)
    resource.responder.member?(user)
  end
end

