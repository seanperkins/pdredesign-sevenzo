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
        {dashboard: dashboard_link, report: report_link}
      else
        {inventory: inventory_link, dashboard: dashboard_link}
      end
    end

    def dashboard_link
      {title: 'View Dashboard', active: true, type: :dashboard}
    end

    def inventory_link
      {title: 'View Inventory', active: true, type: :inventory}
    end

    def report_link
      {title: 'View Report', active: true, type: :report}
    end

    def draft?
      inventory.status == :draft
    end
  end
end