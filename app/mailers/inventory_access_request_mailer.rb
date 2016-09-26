class InventoryAccessRequestMailer < ApplicationMailer
  def request_access(request, email)
    @access_link = access_link(request.token)
    @requester_name = request.user.name
    @roles = request.roles.join(',')
    @inventory_name = request.tool.name
    mail(to: email)
  end

  private
  def access_link(token)
    "#{ENV['BASE_URL']}/#/inventories/grant/#{token}"
  end
end

