require 'spec_helper'

describe OrganizationAuthorizer do
  before do
    @org = Organization.create!(name: 'test')
  end

  it 'allows anyone to read an organization' do
    user = Application::create_sample_user
    expect(@org).to be_readable_by(user) 
  end

  it 'is not updatedable by anyone' do
    user = Application::create_sample_user
    expect(@org).not_to be_updatable_by(user) 
  end

  it 'only network partners can update an org' do
    user = Application::create_sample_user
    user.update(role: 'network_partner')
    expect(@org).to be_updatable_by(user) 
  end
end
