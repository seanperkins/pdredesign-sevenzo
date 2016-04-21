module SharedInventoryFetch
  extend ActiveSupport::Concern

  def inventory
    id = params[:inventory_id] || params[:id]
    @inventory = Inventory.where('inventories.id = ? OR inventories.share_token = ?', id.to_i, id).first
    unless @inventory
      render nothing:true, status: :not_found
      return
    end
    unless @inventory.share_token == id
      authenticate_user!
      authorize_actions_for @inventory
    end
    @inventory
  end
end
