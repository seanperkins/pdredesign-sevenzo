require 'spec_helper'

describe V1::ScoresController do
  render_views
  before(:each) do
    request.env['HTTP_ACCEPT'] = 'application/json'
  end

  describe 'POST #create' do
    context 'when unauthenticated' do
      before(:each) do
        post :create, assessment_id: 9000,
             response_id: 9001,
             question_id: 9001,
             value: 4,
             evidence: 'foo'
      end

      it { expect(response.status).to eq 401 }
    end

    context 'when authenticated' do
      let(:user) {
        create(:user)
      }

      let(:tool) {
        create(:assessment, :with_participants, user: user)
      }

      let(:response_obj) {
        create(:response, responder: tool)
      }

      let(:question) {
        create(:question)
      }

      context 'when the score does not exist' do
        before(:each) do
          sign_in user
          post :create, assessment_id: tool.id,
               response_id: response_obj.id,
               question_id: question.id,
               value: 1,
               evidence: 'new score'
        end

        it 'creates a score' do
          expect(Score.where(response_id: response_obj.id, question_id: question.id, evidence: 'new score').first).to_not be_nil
        end

        it { is_expected.to use_after_action(:flush_assessment_cache) }
      end

      context 'when the evidence is blank' do
        before(:each) do
          sign_in user
          post :create, assessment_id: tool.id,
               response_id: response_obj.id,
               question_id: question.id,
               value: 1,
               evidence: nil
        end

        it 'creates a score' do
          expect(Score.where(response_id: response_obj.id, question_id: question.id, evidence: nil).first).to_not be_nil
        end

        it { is_expected.to use_after_action(:flush_assessment_cache) }
      end

      context 'when the score already exists' do
        let!(:existing_score) {
          create(:score, value: 1, response: response_obj, question: question, evidence: 'old score')
        }

        before(:each) do
          sign_in user
          post :create, assessment_id: tool.id,
               response_id: response_obj.id,
               question_id: question.id,
               value: 3,
               evidence: 'overwriting score'
        end

        it 'updates the score' do
          expect(Score.where(response_id: response_obj.id, question_id: question.id).first.evidence).to eq 'overwriting score'
          expect(Score.where(response_id: response_obj.id, question_id: question.id).first.value).to eq 3
        end

        it 'returns no content' do
          expect(response.status).to eq 204
        end

        it { is_expected.to use_after_action(:flush_assessment_cache) }
      end
    end
  end

  describe 'GET #index' do
    context 'when unauthenticated' do
      before(:each) do
        post :create, assessment_id: 9000,
             response_id: 9001
      end

      it { expect(response.status).to eq 401 }
    end

    context 'when authenticated' do
      let(:user) {
        create(:user)
      }

      let(:tool) {
        create(:assessment, :with_participants, user: user, rubric: rubric)
      }

      let(:response_obj) {
        create(:response, responder: tool, rubric: rubric)
      }

      let!(:rubric) {
        create(:rubric, :as_assessment_rubric)
      }

      let(:category) {
        create(:category)
      }

      let!(:scores) {
        scores = create_list(:score, 9, response: response_obj)
        scores.each {|score|
          score.question = create(:question, rubrics: [rubric], category: category)
          rubric.questions << score.question
          score.save!
        }
        scores
      }

      before(:each) do
        sign_in user
        get :index, assessment_id: tool.id,
            response_id: response_obj.id
      end

      it 'gives a list of scores for each question' do
        expect(json.count).to eq(9)
      end

      it 'gives a score for each question' do
        first = json.detect { |q| q["id"] == scores.first.question.id }
        expect(first["score"]["id"]).to eq(scores.first.id)
      end
    end
  end
end
