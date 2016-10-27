class AccessRequestNotificationWorker
  include ::Sidekiq::Worker

  def perform(access_request_id)
    request = AccessRequest.find(access_request_id)
    assessment = Assessment.find(request.tool_id)

    assessment.facilitators.uniq.each do |facilitator|
      AccessRequestMailer
          .request_access(request, facilitator.user.email)
          .deliver_now
    end
  end
end
