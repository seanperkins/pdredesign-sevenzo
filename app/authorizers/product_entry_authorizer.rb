class ProductEntryAuthorizer < ApplicationAuthorizer
  def readable_by?(user)
    is_owner_or_belongs_to_district?(user)
  end

  def creatable_by?(user)
    is_owner_or_belongs_to_district?(user)
  end

  def updatable_by?(user)
    is_owner_or_belongs_to_district?(user)
  end

  private
  def is_owner_or_belongs_to_district?(user)
    resource.inventory.try(:owner?, user: user) ||
        resource.inventory.try(:participant?, user: user) ||
        resource.inventory.try(:facilitator?, user: user) ||
        resource.inventory.try(:member?, user: user)
  end
end
