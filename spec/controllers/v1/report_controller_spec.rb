require  'spec_helper'

describe V1::ReportController do
  render_views

  describe '#show' do
    let(:assessment) { FactoryGirl.create(:assessment, :with_participants) }

    context 'without user' do
      before(:each) do
        sign_out :user
        get :show, assessment_id: 1, format: :json
      end

      it do
        sign_out :user
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'logged in as participant user' do
      let(:participant) { assessment.participants.first }
      let(:participant_user) { participant.user }

      before(:each) do
        sign_in participant_user
        get :show, assessment_id: assessment.id, format: :json
      end

      it 'gets a report' do
        expect(response).to have_http_status(:success)
      end

      it 'updates the participants viewed report time' do
        expect(participant.reload[:report_viewed_at]).not_to be_nil
      end

      it 'assigns the assessment' do
        expect(assigns(:assessment).id).to eq(assessment.id)
      end

      it 'assigns the axes' do
        expect(assigns(:axes)).not_to be_nil
      end 

      context 'with response assigned' do
        let(:response) { FactoryGirl.create(:response, responder: participant, rubric: assessment.rubric) }

        before(:each) do
          assessment.update(response: response)
          get :show, assessment_id: assessment.id, format: :json
        end

        it 'loads response' do
          expect(assigns(:response)).not_to be_nil
        end
      end
    end

    context 'logged in as non-participant user' do
      let(:non_participant_user) { FactoryGirl.create(:user) }

      before(:each) do
        sign_in non_participant_user
        get :show, assessment_id: assessment.id, format: :json
      end

      it 'does not allow non-participants' do
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe "#consensus_report" do
    let(:assessment) { FactoryGirl.create(:assessment, :with_participants) }
    let(:consensu){ assessment.response.nil? ? Response.create(responder_id:   assessment.id, responder_type: 'Assessment') : assessment.response }

    context 'without user logged in' do
      before(:each) do
        sign_out :user
        get :consensus_report, assessment_id: 1, consensu_id: 1, format: :json
      end

      it 'does not retrieve consensus report' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'user participant logged in' do
      let(:participant) { assessment.participants.first }
      let(:participant_user) { participant.user }

      before do
        sign_in participant_user
      end

      context 'on an existing consensus' do
        before do
          get :consensus_report, assessment_id: assessment.id, consensu_id: consensu.id, format: :json
        end

        it 'responds successfully' do
          expect(response).to have_http_status(:ok)
        end

        it 'returns scores as array' do
          expect(json["scores"]).to be_kind_of(Array)
        end

        it 'returns questions as array' do
          expect(json["questions"]).to be_kind_of(Array)
        end

        it 'returns participants as array as the participants of the assessment' do
          expect(json["participants"].count).to eq(assessment.participants.count)
        end

        it 'get the participant count' do
          expect(json["participant_count"]).not_to be_nil
        end
      end

      context 'on an existing consensus' do
        before do
          get :consensus_report, assessment_id: assessment.id, consensu_id: 9990, format: :json
        end

        it 'render not found when consensus does not exist' do
          expect(response).to have_http_status(:not_found)
        end
      end
    end
  end

  describe "#participant_consensu_report" do
    before { create_magic_assessments }
    before { create_struct }
    before { sign_in @user2 }
    let(:assessment) { @assessment_with_participants }
    let(:consensu){ assessment.response.nil? ? Response.create(responder_id:   assessment.id, responder_type: 'Assessment') : assessment.response }

    it 'get the participant consensus report' do
      get :participant_consensu_report, assessment_id: assessment.id, consensu_id: consensu.id, participant_id: @participant.id, format: :json
      
      expect(json["questions"]).to be_kind_of(Array)
      expect(json["consensu_id"]).not_to be_nil
      expect(json["assessment_id"]).not_to be_nil
      expect(json["participant_id"]).not_to be_nil

      expect(response).to have_http_status(:ok)
    end

    it 'render not found when consensus does not exist' do
      get :participant_consensu_report, assessment_id: 900, consensu_id: 900, participant_id: 800, format: :json
      expect(response).to have_http_status(:not_found)
    end

    it 'requires a user login' do
      sign_out :user
      get :participant_consensu_report, assessment_id: 1, consensu_id: 1, participant_id: 1, format: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
