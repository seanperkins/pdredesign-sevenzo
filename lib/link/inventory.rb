module Link
  class Inventory
    attr_reader :inventory, :user

    delegate :network_partner?, to: :user
    delegate :facilitator?, :participant?, to: :inventory

    def initialize(inventory, user)
      @inventory = inventory
      @user = user
    end

    def execute
      target.new(inventory, user).execute
    end

    private
    def target
      return Link::InventoryFacilitator if facilitator?(user: user)
      return Link::InventoryParticipant if participant?(user: user)
      Link::Partner
    end
  end
end