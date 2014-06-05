class ResponseAuthorizer < ApplicationAuthorizer
  def creatable_by?(user)
    return false unless resource.responder
    resource.responder.user_id == user.id
  end

  def readable_by?(user)
    return false unless resource.responder
    return true  if resource.responder_type == 'Assessment'
    resource.responder.user_id == user.id
  end
end

