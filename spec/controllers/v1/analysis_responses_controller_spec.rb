require 'spec_helper'

describe V1::AnalysisResponsesController do

  describe 'POST #create' do
    context 'when unauthenticated' do
      before(:each) do
        post :create, inventory_id: 100000, analysis_id: 100000
      end

      it 'rejects their request outright' do
        expect(response.status).to eq 302
      end
    end


    context 'when the user does not have the ability to create an analysis' do
      let(:user) {
        create(:user)
      }

      let(:inventory) {
        create(:inventory)
      }

      let(:analysis) {
        create(:analysis, inventory: inventory)
      }

      before(:each) do
        sign_in user
        post :create, inventory_id: inventory.id, analysis_id: analysis.id
      end

      it 'does not allow them to create the entity' do
        expect(response.status).to eq 403
      end
    end

    context 'when authorized to create an analysis' do
      let(:user) {
        create(:user)
      }

      let(:inventory) {
        create(:inventory, members: create_list(:inventory_member, 1, :as_facilitator, user: user))
      }

      let(:analysis_member) {
        create(:analysis_member, :as_facilitator, user: user)
      }

      let(:rubric) {
        create(:rubric, :as_analysis_rubric)
      }

      let(:analysis) {
        create(:analysis, inventory: inventory, members: [analysis_member], rubric: rubric)
      }

      before(:each) do
        sign_in user
        post :create, inventory_id: inventory.id, analysis_id: analysis.id
      end

      it 'creates the response entity' do
        response = Response.where(responder_id: analysis_member.id, responder_type: 'Analysis').first
        expect(response).to_not be_nil
        expect(response.rubric.id).to eq rubric.id
      end
    end
  end
end
