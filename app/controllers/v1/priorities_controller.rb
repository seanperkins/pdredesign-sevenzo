class V1::PrioritiesController < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :assessment

  def index
    @diagnostic_min = 2
    @categories = categories
  end

  authority_actions create: :show

  def create
    priority = find_or_initialize(assessment)
    priority[:order] = params[:order]
    if priority.save
      render nothing: true
    else
      render status: 422, nothing: true
    end
  end

  authority_actions create: :update

  private
  def categories
    @categories ||= Assessments::Priority
                        .new(assessment)
                        .categories
  end

  def find_or_initialize(assessment)
    Priority.find_or_initialize_by(tool: assessment)
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end

end
