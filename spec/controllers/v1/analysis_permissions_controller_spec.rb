require 'spec_helper'

describe V1::AnalysisPermissionsController do
  render_views

  describe '#show' do
    context 'logged-out user' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }
      let(:analysis) { inventory.analyses.first }
      before(:each) do
        get :show,
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
        FactoryGirl.create_list(:analysis_member, 2, :as_facilitator, analysis: analysis)
        FactoryGirl.create_list(:analysis_member, 3, :as_participant, analysis: analysis)
        sign_in inventory.owner
        get :show,
           inventory_id: inventory.id,
           analysis_id: analysis.id,
           format: :json
      end

      it { expect(response).to have_http_status(:success) }
      it { expect(json).to have_at_least(5).items }

      it 'contain all facilitators' do
        expect((json.select {|permission| permission['current_permission_level']['role'] == 'facilitator'}).map {|p| p['id']}).to have_at_least(2).items
      end

      it 'contain all participants' do
        expect((json.select {|permission| permission['current_permission_level']['role'] == 'participant'}).map {|p| p['id']}).to have_at_least(3).items
      end
    end
  end

  describe '#update' do
    context 'logged-out user' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }
      let(:analysis) { inventory.analyses.first }
      before(:each) do
        post :update,
           inventory_id: inventory.id,
           analysis_id: analysis.id,
           format: :json
      end

      it { expect(response).to have_http_status(:unauthorized) }
    end

    context 'logged-in user' do
      let(:inventory) { FactoryGirl.create(:inventory, :with_analysis) }
      let(:analysis) { inventory.analyses.first }
      let(:original_participant_users) { analysis.participants.map(&:user) }
      let(:original_participant_emails) { original_participant_users.map(&:email) }

      before(:each) do
        FactoryGirl.create_list(:analysis_member, 2, :as_participant, analysis: analysis)
        sign_in inventory.owner
        post :update,
          inventory_id: inventory.id,
          analysis_id: analysis.id,
          format: :json,
          permissions: original_participant_emails.map { |email| {email: email, role: 'facilitator'} }
      end

      it { expect(response).to have_http_status(:success) }

      it 'changed all roles' do 
        expect(analysis.facilitators.count).to be(2)
        expect(analysis.facilitators.map(&:user).map(&:email)).to include *original_participant_emails
      end
    end
  end
end
