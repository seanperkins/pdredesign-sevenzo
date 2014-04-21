require 'spec_helper'

describe 'PdrClient Engine' do
  routes { PdrClient::Engine.routes }

  it 'routes root to the angular engine' do
    expect(get: "/").to route_to(
      controller: "pdr_client",
      action: 'index'
    )
  end
end
