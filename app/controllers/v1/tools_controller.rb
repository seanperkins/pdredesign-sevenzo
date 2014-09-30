class V1::ToolsController < ApplicationController
  before_action :authenticate_user!

  def index
    @phases = ToolPhase.all
  end

  def create
    @tool      = Tool.new(tool_create_params)
    @tool.user = current_user

    if @tool.save
      render :show
    else
      @errors = @tool.errors
      render 'v1/shared/errors', status: 422
    end
  end

  def tools_for_subcategory(subcategory)
    default_tools(subcategory) + tools_for(subcategory)
  end

  def tools_for(category)
    category 
     .tools
     .joins(:districts)
     .where(districts: {id: current_user.district_ids})
     .uniq
  end

  private
  def default_tools(subcategory)
    subcategory.tools.where(is_default: true)
  end

  def tool_create_params
    params.permit(:title, :description, :url, :tool_subcategory_id, :tool_category_id)
  end
end
