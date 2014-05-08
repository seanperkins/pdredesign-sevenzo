class V1::RubricsController < ApplicationController
  before_action :authenticate_user!

  def index
    @rubrics = Rubric.enabled
  end
end
