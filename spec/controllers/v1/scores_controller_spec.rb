require 'spec_helper'

describe V1::ScoresController do
  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end
  render_views

  before do 
    create_magic_assessments
    create_struct
    Score.all.destroy_all
  end

  before { sign_in @user }
  let(:assessment) { @assessment_with_participants }

  context '#create' do
    it 'can create a score' do 
      question = Question.first
      post :create, assessment_id: assessment.id, 
                    response_id: 99,
                    question_id: question.id,
                    value: 1,
                    evidence: 'new score' 

      score = Score.find_by(response_id: 99, question_id: question.id) 
      expect(score.evidence).to eq('new score')
    end

    it 'does not allow a non-owner to create a score' do
      sign_in @user2
      question = Question.first
      post :create, assessment_id: assessment.id, 
                    response_id: 99,
                    question_id: question.id,
                    value: 1,
                    evidence: 'new score' 

      assert_response :forbidden
    end

    it 'updates an existing score' do
      question = Question.first
      score = Score.create(response_id: 99, 
                   question_id: question.id, 
                   value: 2, 
                   evidence: 'test')

      post :create, assessment_id: assessment.id, 
                    response_id: 99,
                    question_id: question.id,
                    value: 1,
                    evidence: 'new score' 
      score = Score.find(score.id)

      expect(score.value).to eq(1)
      expect(score.evidence).to eq('new score')
    end
  end

  context '#index' do
    it 'gives a list of scores for each question' do
      get :index, assessment_id: assessment.id,
                  response_id: 99

      expect(json.count).to eq(9)
    end

    it 'gives a score for each question' do
      question = Question.first
      score = Score.create(response_id: 99, 
        question_id: question.id, 
        value: 2, 
        evidence: 'test')

      get :index, assessment_id: assessment.id,
                  response_id: 99
      first = json.detect { |q| q["id"] == question.id } 
      expect(first["score"]["id"]).to eq(score.id)
    end
  end
end
