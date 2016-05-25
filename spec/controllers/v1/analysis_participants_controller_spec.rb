require 'spec_helper'

describe V1::AnalysisParticipantsController do
  render_views

  describe '#create' do
    let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }
    let(:analysis) { inventory.analyses.first }

    context 'logged-out user' do
      let(:user) { FactoryGirl.create(:user) }

      before(:each) do
        sign_out :user
        post :create,
          inventory_id: inventory.id, 
          analysis_id: analysis.id,
          user_id: user.id,
          format: :json
      end

      it { expect(response).to have_http_status(:unauthorized) }
    end

    context 'logged-in user' do
      let(:district_user) { FactoryGirl.create(:user, :with_district) }

      before(:each) do
        sign_in inventory.owner

        post :create,
          inventory_id: inventory.id,
          analysis_id: analysis.id,
          user_id: district_user.id,
          format: :json
      end

      it { expect(response).to have_http_status(:created) }
      it { expect(analysis.participants.where(user: district_user)).to exist }
    end
  end

  describe '#destroy' do
    context 'logged-out user' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }
      let(:analysis) { inventory.analyses.first }

      before(:each) do
        sign_out :user

        delete :destroy,
          inventory_id: inventory.id,
          analysis_id: inventory.analyses.first.id,
          format: :json,
          id: 1
      end

      it { expect(response).to have_http_status(:unauthorized) }
    end

    context 'logged-in user' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }
      let(:analysis) { inventory.analyses.first }
      let(:member_user) { FactoryGirl.create(:analysis_member, analysis: analysis) }

      before(:each) do
        sign_in inventory.owner

        delete :destroy,
          inventory_id: inventory.id,
          analysis_id: analysis.id,
          id: member_user.user.id,
          format: :json
      end

      it { expect(response).to have_http_status(:success) }
      it { expect(inventory.participants.where(user: member_user)).not_to exist }
    end
  end

  describe '#all' do
    context 'logged-out user' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }
      let(:analysis) { inventory.analyses.first }

      before(:each) do
        sign_out :user

        get :all,
           inventory_id: inventory.id,
           analysis_id: analysis.id,
           format: :json
      end

      it { expect(response).to have_http_status(:unauthorized) }
    end

    context 'logged-in user' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }
      let(:analysis) { inventory.analyses.first }

      before(:each) do
        FactoryGirl.create_list(:user, 2, districts: [inventory.district])
        FactoryGirl.create_list(:user, 3)
        sign_in inventory.owner

        get :all,
           inventory_id: inventory.id,
           analysis_id: analysis.id,
           format: :json
      end

      it { expect(response).to have_http_status(:success) }
      it { expect(JSON.parse(response.body).size).to be(2) }
    end
  end
end