class InventoryAccessRequestMailer < ApplicationMailer
  def request_access(request, email)
    @access_link = access_link(request)
    @requester_name = request.user.name
    @roles = request.roles
    @inventory_name = request.tool.name
    mail(to: email)
  end

  private
  def access_link(request)
    "#{ENV['BASE_URL']}/#/inventories/#{request.tool.id}/dashboard"
  end
end

