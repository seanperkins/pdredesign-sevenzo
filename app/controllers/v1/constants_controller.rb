class V1::ConstantsController < ApplicationController
  before_action :authenticate_user!

  def product_entry
    render template: 'v1/constants/product_entry', status: 200
  end

  def data_entry
    render template: 'v1/constants/data_entry', status: 200
  end
end

