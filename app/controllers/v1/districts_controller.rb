class V1::DistrictsController < ApplicationController
  def search
    @results = District.search(district_params[:query])
  end

  private
  def district_params
    params.permit(:query)
  end
end
