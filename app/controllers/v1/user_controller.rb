class V1::UserController < ApplicationController
  before_action :authenticate_user!, except: :create

  def show
    render partial: 'v1/shared/user', locals: { user: current_user }
  end

  def create
    @user = User.new(user_params)
    @user.role = params[:role] || :member

    if @user.save
      render status: 200, nothing: true
    else
      @errors = @user.errors
      render 'v1/shared/errors', status: 422
    end
  end

  def update
    @user = current_user
    if current_user.update(user_params)
      render partial: 'v1/shared/user', locals: { user: current_user }
    else
      @errors = current_user.errors
      render 'v1/shared/errors', status: 422
    end
  end

  private
  def user_params
    params
      .permit(:first_name,
              :last_name,
              :email,
              :district_ids,
              :twitter,
              :team_role,
              :password,
              :password_confirmation)
  end
end
