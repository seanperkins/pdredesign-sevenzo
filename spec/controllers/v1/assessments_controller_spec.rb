require 'spec_helper'

describe V1::AssessmentsController do
  render_views

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  context '#index' do
    before do
      create_magic_assessments
    end

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
end
