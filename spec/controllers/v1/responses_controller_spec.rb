require 'spec_helper'

describe V1::ResponsesController do
  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end
  render_views

  before { create_magic_assessments }
  before { sign_in @user }
  let(:assessment) { @assessment_with_participants }

  context '#show' do
    before do
      Response.create(responder_id:   @participant.id,
        responder_type: 'Participant',
        id: 42)
      create_struct
    end

    it 'assigns rubric' do
      get :show, assessment_id: assessment.id, id: 42
      expect(assigns(:rubric)[:id]).to eq(@rubric.id)
    end

    it 'shows a users response' do
      get :show, assessment_id: assessment.id, id: 42
      expect(json["id"]).to eq(42)
    end

    it 'doesnt allow non-owners to view response' do
      sign_in @user3
      get :show, assessment_id: assessment.id, id: 42
      assert_response :forbidden
    end


    it 'returns the category => question => score struct' do
      get :show, assessment_id: assessment.id, id: 99

      category = json["categories"].detect { |category| category["name"] == "first"}
      expect(json["categories"].count).to eq(3)
      expect(category["name"]).not_to be_nil

    end

    it 'returns the rigth questions strct' do
      get :show, assessment_id: assessment.id, id: 99

      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]

      expect(questions.count).to eq(3)
      expect(questions.first["headline"]).to match(/headline/)
    end

    it 'returns the score of a question' do
      get :show, assessment_id: assessment.id, id: 99
      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]

      expect(questions.first["score"]["evidence"]).to eq("expected")
    end

    it 'returns the answers for a question' do
      get :show, assessment_id: assessment.id, id: 99

      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]
      answers   = questions.first["answers"]
      expect(answers.count).to eq(4)
      expect(answers.first["value"]).to eq(1)
    end

  end

  context '#create' do 
    it 'creates a response if non exist for a user' do
      post :create, assessment_id: assessment.id

      responses = Response.where(responder_id: @participant.id)
      expect(responses.count).to eq(1)
    end

   
    it 'finds the existing response if one exists' do
      Response.create(responder_id:   @participant.id,
                      responder_type: 'Participant',
                      id: 42)

      post :create, assessment_id: assessment.id
      expect(json["id"]).to eq(42)
    end

    it 'only creates a response if the user is a participant' do
      sign_in @user3
      post :create, assessment_id: assessment.id

      assert_response :forbidden
    end

    it 'creates scores for each question for the rubric' do
      3.times { @rubric.questions.create! }

      post :create, assessment_id: assessment.id
      expect(json["scores"].count).to eq(3)
    end
  end
end
