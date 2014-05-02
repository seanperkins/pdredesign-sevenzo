class V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
  end
end
