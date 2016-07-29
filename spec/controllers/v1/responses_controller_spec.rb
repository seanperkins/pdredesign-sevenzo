require 'spec_helper'

describe V1::ResponsesController do
  before(:each) do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end
  render_views

  describe '#create' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    context 'when the user is not a participant of the assessment' do
      let(:user) {
        assessment.facilitators.sample
      }

      before(:each) do
        sign_in user
        post :create, assessment_id: assessment.id
      end

      it {
        is_expected.to respond_with :forbidden
      }
    end

    context 'when the user is a participant of the assessment' do
      context 'when no response prior exists' do
        let(:user) {
          participant.user
        }

        let(:participant) {
          assessment.participants.sample
        }

        before(:each) do
          sign_in user
          post :create, assessment_id: assessment.id
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          expect(Response.where(responder_id: participant.id).count).to eq 1
        }
      end

      context 'when a response exists' do
        let(:user) {
          participant.user
        }

        let(:participant) {
          assessment.participants.sample
        }

        let!(:preexisting_response) {
          create(:response, :as_participant_responder, responder: participant)
        }

        before(:each) do
          sign_in user
          post :create, assessment_id: assessment.id
        end

        it {
          expect(json['id']).to eq preexisting_response.id
        }
      end
    end
  end

  context '#show' do

    context 'when a valid response is passed' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:participant) {
        assessment.participants.sample
      }

      let(:user) {
        participant.user
      }

      let(:participant_response) {
        create(:response, :as_participant_responder, responder: participant)
      }

      before(:each) do
        sign_in user
        get :show, assessment_id: assessment.id, id: participant_response.id
      end

      it {
        expect(assigns(:rubric)[:id]).to eq assessment.rubric.id
      }

      it {
        expect(json["id"]).to eq participant_response.id
      }

      it {
        category = json["categories"].detect { |category| category["name"] == "first"}
        expect(json["categories"].count).to eq 3
        expect(category["name"]).not_to be_nil
      }

      it {
        category  = json["categories"].detect { |category| category["name"] == "first"}
        questions = category["questions"]

        expect(questions.count).to eq(3)
        expect(questions.first["headline"]).to match(/headline/)
      }
    end

    it 'doesnt allow non-owners to view response' do
      sign_in @user3
      get :show, assessment_id: assessment.id, id: 42
      assert_response :forbidden
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

    it 'returns the answers in the correct order' do
      db_answers = Response.find(99).questions.first.answers
      db_answers.first.update(value: 4)
      db_answers.last.update(value: 1)

      get :show, assessment_id: assessment.id, id: 99

      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]
      answers   = questions.first["answers"]
      expect(answers.count).to eq(4)
      expect(answers.first["value"]).to eq(1)
    end

    it 'returns KeyQuestion and points' do
      question     = Question.find_by(headline: 'headline 0')
      key_question = KeyQuestion::Question.create!(text: 'Sometext', question: question)
      3.times { |i| KeyQuestion::Point.create!(text: "point #{i}", key_question: key_question) }

      get :show, assessment_id: assessment.id, id: 99

      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]
      expect(questions.first["key_question"]).not_to be_nil
      expect(questions.first["key_question"]["points"].count).to eq(3)
    end
  end


  context '#show_slimmed' do
    before do
      Response.create(responder_id:   @participant.id,
                      responder_type: 'Participant',
                      id: 42)
      create_struct
    end

    it 'assigns rubric' do
      get :show_slimmed, assessment_id: assessment.id, response_id: 42
      expect(assigns(:rubric)[:id]).to eq(@rubric.id)
    end

    it 'shows a users response' do
      get :show_slimmed, assessment_id: assessment.id, response_id: 42
      expect(json["id"]).to eq(42)
    end

    it "doesn't allow non-owners to view response" do
      sign_in @user3
      get :show_slimmed, assessment_id: assessment.id, response_id: 42
      assert_response :forbidden
    end

    it 'returns the category => question => score struct' do
      get :show_slimmed, assessment_id: assessment.id, response_id: 99

      category = json["categories"].detect { |category| category["name"] == "first"}
      expect(json["categories"].count).to eq(3)
      expect(category["name"]).not_to be_nil

    end

    it 'returns the right questions struct' do
      get :show_slimmed, assessment_id: assessment.id, response_id: 99

      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]

      expect(questions.count).to eq(3)
      expect(questions.first["headline"]).to match(/headline/)
    end

    it 'returns the score of a question' do
      get :show_slimmed, assessment_id: assessment.id, response_id: 99
      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]

      expect(questions.first["score"]["evidence"]).to eq("expected")
    end

    it 'returns the answers for a question' do
      get :show_slimmed, assessment_id: assessment.id, response_id: 99

      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]
      answers   = questions.first["answers"]
      expect(answers.count).to eq(4)
      expect(answers.first["value"]).to eq(1)
    end

    it 'returns the answers in the correct order' do
      db_answers = Response.find(99).questions.first.answers
      db_answers.first.update(value: 4)
      db_answers.last.update(value: 1)

      get :show_slimmed, assessment_id: assessment.id, response_id: 99

      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]
      answers   = questions.first["answers"]
      expect(answers.count).to eq(4)
      expect(answers.first["value"]).to eq(1)
    end

    it 'returns KeyQuestion and points' do
      question     = Question.find_by(headline: 'headline 0')
      key_question = KeyQuestion::Question.create!(text: 'Sometext', question: question)
      3.times { |i| KeyQuestion::Point.create!(text: "point #{i}", key_question: key_question) }

      get :show_slimmed, assessment_id: assessment.id, response_id: 99

      category  = json["categories"].detect { |category| category["name"] == "first"}
      questions = category["questions"]
      expect(questions.first["key_question"]).not_to be_nil
      expect(questions.first["key_question"]["points"].count).to eq(3)
    end
  end

  context '#update' do
    before do
      Response.create(responder_id:   @participant.id,
                      responder_type: 'Participant',
                      id: 42)
      create_struct
    end

    it 'does not update response with the wrong owner' do
      sign_in @user2

      put :update, assessment_id: assessment.id, id: 42, submit: true
      assert_response :forbidden
    end

    it 'submits an response with the right owner' do
      sign_in @user

      put :update, assessment_id: assessment.id, id: 42, submit: true
      response = Response.find(42)

      assert_response :success
      expect(response.submitted_at).not_to be_nil
    end

    it "submits the response and touch the assessment to crear up the flush the cached version" do
      sign_in @user
      expect_flush_cached_assessment

      put :update, assessment_id: assessment.id, id: 42, submit: true; assessment.reload
    end

    it 'queues up email for a completed response' do
      sign_in @user

      expect(ResponseCompletedNotificationWorker).to receive(:perform_async)
        .with(42)
      put :update, assessment_id: assessment.id, id: 42, submit: true
      assert_response :success
    end

  end



end
