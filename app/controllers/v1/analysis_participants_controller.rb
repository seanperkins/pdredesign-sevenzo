class V1::AnalysisParticipantsController < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :analysis

  def index
    @participants = analysis.participants
  end

  def create
    params = participant_params
    user = User.find(params[:user_id])
    permission = Analyses::Permission.new(analysis: analysis, user: user)
    permission.role = 'participant'
    render nothing: true, status: :created
  end

  authority_actions create: 'update'

  def destroy
    user = User.find(params[:id])
    permission = Analyses::Permission.new(analysis: analysis, user: user)
    permission.revoke
    render nothing: true
  end

  def all
    district = analysis.inventory.district
    participant_ids = analysis.members.pluck(:user_id)
    @users = User.includes(:districts).where(districts: {id: district.id}).where.not(id: participant_ids)
                 .reject { |u| u.role.to_sym == :network_partner }
  end
  authority_actions all: 'update'

  protected
  def participant_params
    params.permit(:user_id)
  end

  def inventory
     @inventory ||= Inventory.find(params[:inventory_id])
  end

  def analysis
    inventory.analyses.find(params[:analysis_id])
  end
end
