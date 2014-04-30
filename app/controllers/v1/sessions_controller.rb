class V1::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    resource = User.find_for_database_authentication(:email => params[:email])
    return failure unless resource

    if resource.valid_password?(params[:password])
      sign_in(:user, resource)
      render :create, locals: { user: resource }, formats: [:json]
      return
    end
    failure
  end

  def failure
    return render status: 401, json: { success: false, errors: ['Login information is incorrect, please try again'] }
  end
end
