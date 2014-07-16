require  'spec_helper'

describe V1::ReportController do
  render_views
  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  context '#show' do
    before { create_magic_assessments }
    before { create_struct }
    before { sign_in @user2 }
    let(:assessment) { @assessment_with_participants }

    it 'requires a user login' do
      sign_out :user
      get :show, assessment_id: 1
      assert_response 401
    end

    it 'gets a report' do
      get :show, assessment_id: assessment.id
      assert_response :success
    end

    it 'updates the participants viewed report time' do
      get :show, assessment_id: assessment.id

      participant = Participant
        .find_by(assessment: assessment, user: @user)

      expect(participant[:report_viewed_at]).not_to be_nil
    end

    it 'assigns the assessment' do
      get :show, assessment_id: assessment.id
      expect(assigns(:assessment).id).to eq(assessment.id)
    end

    it 'assigns the axes' do
      get :show, assessment_id: assessment.id
      expect(assigns(:axes)).not_to be_nil
    end 

    it 'assigns response' do
      assessment.update(response: Response.find(99))
      get :show, assessment_id: assessment.id
      expect(assigns(:response)).not_to be_nil
    end

    it 'does not allow non-participants' do
      sign_in @user3
      get :show, assessment_id: assessment.id
      assert_response :forbidden
    end

  end


end
