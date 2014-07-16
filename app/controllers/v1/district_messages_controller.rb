class V1::DistrictMessagesController < ApplicationController

  def create
    @record = DistrictMessage.new(message_params)
    if @record.save
      render nothing: true
    else
      @errors = @record.errors
      render 'v1/shared/errors' , errors: @errors, status: 422
    end
  end

  private
  def message_params
    params.permit(:name, :address, :sender_name, :sender_email)
  end
end

 
