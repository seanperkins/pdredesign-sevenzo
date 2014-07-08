# Other authorizers should subclass this one
class ApplicationAuthorizer < Authority::Authorizer

  # Any class method from Authority::Authorizer that isn't overridden
  # will call its authorizer's default method.
  #
  # @param [Symbol] adjective; example: `:creatable`
  # @param [Object] user - whatever represents the current user in your app
  # @return [Boolean]
  def self.default(adjective, user)
    # 'Whitelist' strategy for security: anything not explicitly allowed is
    # considered forbidden.
    false
  end

  protected
  def viewer?(user)
    resource.viewer?(user)
  end

  def facilitator?(user)
    resource.facilitator?(user)
  end

  def participant?(user)
    resource.participant?(user)
  end

  def share_districts?(user)
    user.district_ids.include?(resource.district_id)
  end

  def owner?(user)
    user.id && resource.user.id == user.id
  end


end
