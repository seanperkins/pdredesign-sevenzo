require 'spec_helper'

describe OrganizationAuthorizer do
  let(:org) {
    Organization.create!(name: 'test')
  }

  let(:user) {
    FactoryGirl.create(:user, :with_district)
  }

  it 'allows anyone to read an organization' do
    expect(org).to be_readable_by(user)
  end

  it 'is not updatedable by anyone' do
    expect(org).not_to be_updatable_by(user)
  end

  it 'only network partners can update an org' do
    user.update(role: 'network_partner')
    expect(org).to be_updatable_by(user) 
  end
end
