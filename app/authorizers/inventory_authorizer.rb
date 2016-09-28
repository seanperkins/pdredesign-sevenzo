class InventoryAuthorizer < ApplicationAuthorizer
  def creatable_by?(user)
    true
  end

  def updatable_by?(user)
    resource.member?(user)
  end

  def readable_by?(user)
    resource.member?(user)
  end

  def deletable_by?(user)
    resource.facilitator?(user)
  end
end
