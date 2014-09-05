class V1::OrganizationsController < ApplicationController
  before_action :authenticate_user!, except: [:search]

  def create
    authorize_action_for Organization
    @organization = Organization.new(organization_params)

    render_errors(@organization.errors) unless @organization.save
  end

  def update
    @organization = find_organization
    authorize_action_for @organization

    @organization.update(organization_params)
    render_errors(@organization.errors) unless @organization.save
  end

  def search
    @results = Organization.search(params[:query])
  end

  def show
    @organization = find_organization
  end

  def upload
    @organization = find_organization(params[:organization_id])
    @organization.update(logo: params[:file])

    render nothing: true
  end

  private

  def render_errors(errors)
    @errors = errors
    render 'v1/shared/errors', status: 422
  end

  def find_organization(id = params[:id])
    Organization.find(id)
  end

  def organization_params
    params.permit(:id, :name, :category_ids=>[])
  end
end
