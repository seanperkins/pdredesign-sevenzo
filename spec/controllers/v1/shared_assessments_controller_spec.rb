require 'spec_helper'

describe V1::SharedAssessmentsController do
  render_views

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe '#show' do
    let(:facilitator) { FactoryGirl.create :user, :with_facilitator_role }
    let(:rubric) { FactoryGirl.create :rubric }
    let(:district) { FactoryGirl.create :district }
    let(:assessment) { FactoryGirl.create :assessment, rubric: rubric, district: district, user: facilitator }

    context 'with valid token' do
      let(:token) { assessment.share_token }

      it do
        get :show, id: token
        assigned = assigns(:assessment)
        expect(assigned.id).to eq(assessment.id)
        assert_response :success
      end
    end

    context 'with invalid token' do
      let(:token) { 'foo-bar-invalid-token' }

      it do
        get :show, id: token
        assert_response :not_found
      end
    end
  end
end
