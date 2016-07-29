require 'spec_helper'

describe V1::SharedReportController do
  render_views

  let(:assessment) {
    create(:assessment, :with_participants)
  }

  describe '#show' do
    it 'gets a report' do
      get :show, shared_token: assessment.share_token, format: :json
      expect(response).to have_http_status(:success)
    end

    it 'assigns the assessment' do
      get :show, shared_token: assessment.share_token, format: :json
      expect(assigns(:assessment).id).to eq(assessment.id)
    end

    it 'assigns the axes' do
      get :show, shared_token: assessment.share_token, format: :json
      expect(assigns(:axes)).not_to be_nil
    end
  end
end
