module Link
  class InventoryParticipant
    attr_reader :inventory
    delegate :is_completed, to: :inventory, prefix: true

    def initialize(inventory, *_)
      @inventory = inventory
    end

    def execute
      return nil if draft?

      if inventory_is_completed

      end
    end

    def draft?
      inventory.status == :draft
    end
  end
end