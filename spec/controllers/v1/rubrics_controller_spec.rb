require 'spec_helper'

describe V1::RubricsController do
  render_views

  let(:user) { FactoryGirl.create(:user, :with_district) }

  before(:each) do
    request.env['HTTP_ACCEPT'] = 'application/json'
    FactoryGirl.create_list(:rubric, 3)
    sign_in user
  end

  context '#index' do 
    it 'requires a user' do
      sign_out :user

      get :index
      assert_response 401
    end

    it 'can get a list of rubrics' do
      get :index

      assert_response :success
      expect(json.count).to eq(3)
    end

    it 'only returns enabled rubrics' do
      Rubric.last.update(enabled: false)
      get :index
      expect(json.count).to eq(2)
    end
  end
end
