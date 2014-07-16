class V1::AccessRequestController < ApplicationController
  before_action :authenticate_user!

  def create
    @request           = AccessRequest.new(request_params)
    @request[:user_id] = current_user.id
    @request[:token]   = hash

    if(@request.save)
      queue_job
      render json: @request
    else
      @errors = @request.errors
      render 'v1/shared/errors', errors: @errors, status: 422
    end
  end

  private
  def hash
    SecureRandom.hex[0..9]
  end

  def queue_job
    AccessRequestNotificationWorker.perform_async(@request.id)
  end

  def request_params
    params.permit(:assessment_id, roles: [])
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end
end
 
