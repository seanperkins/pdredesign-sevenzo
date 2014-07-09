require 'spec_helper'

describe V1::RemindersController do
  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end
  render_views


  before { create_magic_assessments }
  let(:assessment) { @assessment_with_participants }

  describe '#create' do
    before { sign_in @facilitator2 }

    it 'requires a facilitator to create' do
      sign_in @user
      post :create, assessment_id: assessment.id, message: 'Some reminder'
      assert_response :forbidden
    end

    it 'can be created by a facilitator' do
      post :create, assessment_id: assessment.id, message: 'Some reminder'
      assert_response :success
    end

    it 'calls the ReminderNotificationWorker' do
      expect(ReminderNotificationWorker).to receive(:perform_async)
        .with(assessment.id, 'Some reminder')
      post :create, assessment_id: assessment.id, message: 'Some reminder'
    end

  end
end
