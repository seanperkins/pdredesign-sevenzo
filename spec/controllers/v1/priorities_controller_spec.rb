require 'spec_helper'

describe V1::PrioritiesController do
  render_views
  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  before { create_magic_assessments }
  before { sign_in @facilitator2 }
  let(:assessment) { @assessment_with_participants }

  context '#create' do
    it 'requires a user to create' do
      sign_out :user
      post :create, assessment_id: assessment.id,
        order: [1,2,3]

      assert_response 401
    end

    it 'requires the owner to create priorities' do
      sign_in @user2
      post :create, assessment_id: assessment.id,
        order: [1,2,3]

      assert_response :forbidden
    end

    it 'owner can create priority' do
      post :create, assessment_id: assessment.id,
        order: [1,2,3]

      assert_response :success
    end

    it 'creates a priority record' do
      post :create, assessment_id: assessment.id,
        order: [1,2,3]
      priority = Priority.find_by(assessment: assessment) 

      expect(priority.order).to eq([1,2,3])
    end

    it 'does not allow an empty :order' do
      post :create, assessment_id: assessment.id
      assert_response 422
    end
  end

  context '#index' do
    before do
      create_struct
      create_responses

      @cat1 = Category.find_by(name: 'Some cat1')
      @cat2 = Category.find_by(name: 'Some cat2')
      @cat3 = Category.find_by(name: 'Some cat3')

      @priority = Priority
        .create!(order: [@cat2.id, @cat1.id],
                 assessment: assessment)   
    end

    it 'gets the order of the priority' do
      get :index, assessment_id: assessment.id
      assert_response :success
      expect(json.count).to eq(2)
    end

    it 'returns the category name and order' do
      get :index, assessment_id: assessment.id
      assert_response :success
      expect(json[0]["name"]).to eq('Some cat2')
      expect(json[0]["order"]).to eq(1)
      expect(json[0]["average"]).to eq("3.0")
      expect(json[0]["diagnostic_min"]).to eq(2)

      expect(json[1]["name"]).to eq('Some cat1')
    end

    it 'returns order by average score when no priority' do
      @priority.delete 
      get :index, assessment_id: assessment.id

      expect(json[0]["name"]).to eq('Some cat3')
    end

  end
end

