class V1::InventoryRemindersController
  before_action :authenticate_user!

  authorize_actions_for :inventory

  def create
    ReminderNotificationWorker
        .perform_async(inventory.id, message)
    render nothing: true
  end
  authority_actions create: 'update'

  private
  def message
    params[:message]
  end

  def inventory
    Inventory.find(params[:assessment_id])
  end
end
