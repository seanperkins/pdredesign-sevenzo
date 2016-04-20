class AnalysisAuthorizer < ApplicationAuthorizer
  def readable_by?(user)
    is_owner_or_facilitator_of_inventory?(user)
  end

  def creatable_by?(user)
    is_owner_or_facilitator_of_inventory?(user)
  end

  def updatable_by?(user)
    is_owner_or_facilitator_of_inventory?(user)
  end

  private
  def is_owner_or_facilitator_of_inventory?(user)
    resource.inventory.try(:owner?, user: user) ||
        resource.inventory.try(:facilitator?, user: user)
  end
end
