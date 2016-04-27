class V1::AnalysisPermissionsController < ApplicationController
  before_action :authenticate_user!
  before_action :inventory, :analysis

  def show
    @users = inventory.analysis.members.includes(:user).map(&:user)
  end

  def update
    if params[:permissions]
      params[:permissions].each{ |permission| update_permission(permission) }
    end
    render nothing: true
  end

  private
  def update_permission(permission)
    user = User.find_by(email: permission["email"])
    role = permission["role"]
    role = "facilitator" if user.network_partner?
    permission = Analyses::Permission.new(analysis: inventory.analysis, user: user)
    permission.role = role
  end

  def inventory
    @inventory ||= Inventory.find(params[:inventory_id])
  end

  def analysis
    @analysis ||= inventory.analysis
  end
end
