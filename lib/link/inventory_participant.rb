module Link
  class InventoryParticipant
    attr_reader :inventory
    delegate :completed, to: :inventory, prefix: true

    def initialize(inventory, *_)
      @inventory = inventory
    end

    def execute
      return nil if draft?

      if inventory_completed

      end
    end
  end
end