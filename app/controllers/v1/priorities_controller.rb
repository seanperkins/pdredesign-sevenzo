class V1::PrioritiesController < ApplicationController
  before_action :authenticate_user!
  authorize_actions_for :assessment

  def index
    @diagnostic_min = 2
    @categories = categories(assessment)
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
  def categories(assessment)

    categories = Assessments::Report::Overview
      .new(assessment)
      .categories_by_average

    priority = Priority.find_by(assessment: assessment)
    if(priority)
      categories = sort_by_priority(priority, categories)
    end

    categories
  end

  def sort_by_priority(priority, categories)
    priority.order.collect do |id|
      categories.detect { |category| category[:id] == id}
    end.compact
  end

  def find_or_initialize(assessment)
    Priority.find_or_initialize_by(assessment: assessment)
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end

end
