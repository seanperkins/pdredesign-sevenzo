class OrganizationAuthorizer < ApplicationAuthorizer
  def readable_by?(user)
    true
  end

  def updatable_by?(user)
    user.network_partner?
  end

  def self.creatable_by?(user)
    user.network_partner?
  end
end
