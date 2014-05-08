require 'spec_helper'

describe V1::RubricsController do
  render_views

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
    district = District.create!
    @user     = Application::create_sample_user(districts: [district])
  end

  before do
    3.times do |i| 
      Rubric.create(name: "rubric #{i}", version: i, enabled: true)
    end

    sign_in @user
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
