require 'spec_helper'

describe 'PdrClient Engine' do
  it 'routes root to the angular engine' do
    expect(get: "/").to route_to(
      controller: "pdr_client/pdr_client",
      action: 'index'
    )
  end
end
