class V1::InvitationsController < ApplicationController
  def redeem
    not_found    and return unless invitation
    unauthorized and return unless invited_user

    sign_in(:user, invited_user)

    invited_user.update(permitted_params)
    invitation.destroy

    status 200
  end

  def show
    not_found    and return unless invitation
    unauthorized and return unless invited_user

    render partial: 'v1/shared/user', locals: { user: invited_user }
  end

  private
  def permitted_params
    params.permit :first_name, 
      :last_name, 
      :email,
      :password
  end

  def invited_user
    @invited_user ||= User.find_for_database_authentication(email: invitation.email)
  end

  def invitation
    @invitation ||= find_invitation(params[:token])
  end

  def find_invitation(token)
    UserInvitation.find_by(token: token)
  end

end
