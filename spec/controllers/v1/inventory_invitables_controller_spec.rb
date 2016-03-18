require 'spec_helper'

describe V1::InventoryInvitablesController do
  render_views

  describe '#index' do
    context 'logged-out user' do
      let(:inventory) { FactoryGirl.create(:inventory) }

      before(:each) do
        get :index, inventory_id: inventory.id, format: :json
      end

      it { expect(response).to have_http_status(:unauthorized) }
    end

    context 'logged-in user' do
      let(:district) { FactoryGirl.create(:district) }
      let!(:district_users) { FactoryGirl.create_list(:user, 4, :with_district, district: district) }
      let(:inventory) { FactoryGirl.create(:inventory, :with_facilitators, district: district) }
      let(:me) { inventory.facilitators.first.user }

      before(:each) do
        sign_in me
        get :index, inventory_id: inventory.id, format: :json
      end

      it { expect(response).to have_http_status(:success) }

      it do 
        expect(assigns(:users)).to have(district_users.count).items
      end
    end
  end
end
