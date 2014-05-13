require 'spec_helper'

describe V1::AssessmentsController do
  render_views

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  context '#update' do
    before { create_magic_assessments }
    before { sign_in @facilitator2 }
    let(:assessment) { @assessment_with_participants }

    it 'can update an assessment' do
      put :update, {id: assessment.id, rubric_id: 42}
      assert_response :success
    end

    it 'updates the record' do
      time = Time.now
      put :update, {id: assessment.id, 
                    rubric_id: 42,
                    name: 'some assessment',
                    due_date: time,
                    message: 'My message',
                    another_value: 'something'}

      assessment.reload
      expect(assessment.rubric_id).to eq(42)
      expect(assessment.name).to eq('some assessment')
      expect(assessment.message).to eq('My message')
      expect(assessment.due_date).to eq(time.to_s)
    end

    it 'only allows the owner to update' do
      sign_in @facilitator
      put :update, {id: assessment.id, rubric_id: 42}
      assert_response :forbidden
    end
  end

  context '#show' do
    before { create_magic_assessments }
    before { sign_in @facilitator2 }
    let(:assessment) { @assessment_with_participants }

    it 'can retreive the assessment' do
      get :show, id: assessment.id
      assigned = assigns(:assessment)

      expect(assigned.id).to eq(assessment.id)
      assert_response :success
    end

   context 'permissions' do
      it 'requires a logged in user' do
        sign_out :user

        get :show, id: 1
        assert_response :unauthorized
      end

      it 'forbids a non-participant access' do
        sign_in @user
        unauthorized = Assessment.find_by_name("Assessment 1")
        get :show, id: unauthorized.id

        assert_response :forbidden
      end

      it 'forbids facilitator in another district' do
        sign_in @facilitator3

        unauthorized = Assessment.find_by_name("Assessment 1")
        get :show, id: unauthorized.id
        assert_response :forbidden
      end

      it 'allows a facilitator from the same district' do
        user = Application::create_sample_user(districts: [@district2])
        sign_in user

        get :show, id: assessment.id
        assert_response :success
      end
    end
  end

  context '#index' do
    before { create_magic_assessments }

    it 'requires a user logged in user' do
      sign_out :user

      get :index
      assert_response :unauthorized
    end

    it 'gets a facilitators assessments' do
      sign_in @facilitator

      get :index
      assessments = assigns(:assessments)

      expect(assessments.count).to eq(3)
    end

    it 'gets a members assessments' do
      @user.update(role: :member)
      sign_in @user

      get :index
      assessments = assigns(:assessments)

      expect(assessments.count).to eq(1)
    end

  end

  context '#show' do
    before { create_magic_assessments }
    before { sign_in @facilitator2 }
    let(:assessment) { @assessment_with_participants }

    it 'always returns the welcome message' do
      assessment.update(message: 'welcome content')

      get :show, id: assessment.id
      messages = assigns(:messages)

      expect(messages.count).to eq(1)
      expect(messages.first.category).to    eq("welcome")
      expect(messages.first.content).to     eq("welcome content")
      expect(messages.first.sent_at).not_to be_nil
    end
  end
end
