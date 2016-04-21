class V1::AnalysisInvitationsController < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :analysis

  authority_actions create: 'update'
  def create
    create_params = invitation_params
    create_params[:analysis_id] = analysis.id

    invite = AnalysisInvitation.new(create_params)

    unless invite.save
      @errors = invite.errors.messages
      render 'v1/shared/errors', status: 422
      return
    end

    Analyses::MemberFromInvite.new(invite).execute
    render nothing: true
  end

  private
  def invitation_params
    params
      .permit(:first_name, :last_name, :email, :team_role, :role)
  end

  def inventory_id
    params[:inventory_id]
  end

  def analysis
    Inventory.find(inventory_id).analysis
  end
end
