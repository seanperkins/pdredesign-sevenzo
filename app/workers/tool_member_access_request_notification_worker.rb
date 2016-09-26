class ToolMemberAccessRequestNotificationWorker
  include Sidekiq::Worker

  def perform(request_id)
    request = AccessRequest.find_by(id: request_id)
    tool = request.tool

    ToolMember.where(tool: tool, role: ToolMember.member_roles[:facilitator]).uniq.each do |facilitator|
      case tool.class.to_s
        when 'Assessment'
          AccessRequestMailer.request_access(request, facilitator.email).deliver_now
        when 'Inventory'
          InventoryAccessRequestMailer.request_access(request, facilitator.email).deliver_now
      end
    end
  end
end