require 'spec_helper'

describe V1::AssessmentsPermissionsController do
  render_views

  before(:each) do
    request.env['HTTP_ACCEPT'] = 'application/json'
  end

  let(:assessment) {
    create(:assessment, :with_participants)
  }

  describe 'GET #index' do
    context 'when authorized' do
      let(:user) {
        assessment.user
      }

      context 'when an access request is present' do
        let!(:access_request) {
          create(:access_request, assessment: assessment, user: user, roles: ['facilitator'])
        }

        before(:each) do
          sign_in user
          get :index, assessment_id: assessment.id
        end

        it {
          expect(json.first['requested_permission_level']).to_not be_nil
        }
      end

      context 'when an access request is not present' do
        before(:each) do
          sign_in user
          get :index, assessment_id: assessment.id
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          expect(json).to be_empty
        }
      end
    end

    context 'when unauthorized' do
      before(:each) do
        sign_out :user
        get :index, assessment_id: assessment.id
      end

      it {
        is_expected.to respond_with :unauthorized
      }
    end
  end

  describe 'GET #all_users' do
    context 'when authorized' do
      let(:user) {
        assessment.user
      }

      before(:each) do
        sign_in user
        get :all_users, assessment_id: assessment.id
      end

      it {
        is_expected.to respond_with :success
      }

      it {
        expect(json.first['permission_level']).to be_nil
      }

      it 'returns all associated users' do
        expected_user_list = (assessment.users + [assessment.user] + assessment.facilitators).map(&:id)
        actual_user_list = json.map { |json_obj| json_obj['id'] }
        expect(actual_user_list.to_set.intersect?(expected_user_list.to_set)).to be true
      end
    end

    context 'when unauthorized' do
      before(:each) do
        sign_out :user
        get :all_users, assessment_id: assessment.id
      end

      it {
        is_expected.to respond_with :unauthorized
      }
    end
  end

  describe 'GET #show' do
    context 'when authenticated' do
      context 'when not authorized' do
        let(:user) {
          create(:user, :with_district)
        }

        let(:access_request) {
          create(:access_request)
        }

        before(:each) do
          sign_in user
          get :show, assessment_id: assessment.id, id: access_request.id
        end

        it {
          is_expected.to respond_with :forbidden
        }
      end

      context 'when an access request is present' do
        let(:access_request) {
          create(:access_request, assessment: assessment, user: user, roles: ['facilitator'])
        }

        let(:user) {
          create(:user, :with_district)
        }

        let(:facilitator) {
          assessment.user
        }

        before(:each) do
          sign_in facilitator
          get :show, assessment_id: assessment.id, id: access_request.id, user: user, email: access_request.user.email
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          expect(json['requested_permission_level']).to_not be_nil
        }
      end

      context 'when an access request is not present' do

        let(:facilitator) {
          assessment.user
        }

        before(:each) do
          sign_in facilitator
          get :show, assessment_id: assessment.id, id: 0
        end

        it {
          is_expected.to respond_with :missing
        }
      end
    end

    context 'when not authenticated' do
      let(:access_request) {
        create(:access_request)
      }

      before(:each) do
        sign_out :user
        get :show, assessment_id: assessment.id, id: access_request.id
      end

      it {
        is_expected.to respond_with :unauthorized
      }
    end
  end

  describe 'PUT #update' do
    context 'when authenticated' do
      context 'when not authorized' do
        let(:user) {
          create(:user, :with_district)
        }

        before(:each) do
          sign_in user
          put :update, assessment_id: assessment.id, id: 0
        end

        it {
          is_expected.to respond_with :forbidden
        }
      end

      context 'when changing the role from network partner to facilitator' do
        let(:network_partner) {
          create(:user, :with_network_partner_role)
        }

        let(:assessment_with_network_partner) {
          assessment = create(:assessment, :with_participants)
          assessment.facilitators << [network_partner]
          assessment
        }

        before(:each) do
          sign_in network_partner
          put :update,
              assessment_id: assessment_with_network_partner.id,
              id: network_partner.id,
              permissions: [{
                                level: 'facilitator',
                                email: network_partner.email
                            }]
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          expect(assessment_with_network_partner.facilitator?(network_partner)).to be true
        }

        it {
          expect(assessment_with_network_partner.network_partner?(network_partner)).to be false
        }
      end

      context 'when changing the role from participant to network partner' do
        let(:participant) {
          assessment.participants.sample.user
        }

        let(:user) {
          assessment.user
        }

        before(:each) do
          sign_in user
          put :update, assessment_id: assessment.id, id: participant.id,
              permissions: [{
                                level: 'network_partner',
                                email: participant.email
                            }]
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          expect(assessment.facilitator?(participant)).to be false
        }

        it {
          expect(assessment.network_partner?(participant)).to be true
        }
      end

      context 'when changing the role from participant to facilitator' do
        let(:participant) {
          assessment.participants.sample.user
        }

        let(:user) {
          assessment.user
        }

        before(:each) do
          sign_in user
          put :update, assessment_id: assessment.id, id: participant.id,
              permissions: [{
                                level: 'facilitator',
                                email: participant.email
                            }]
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          expect(assessment.facilitator?(participant)).to be true
        }

        it {
          expect(assessment.participant?(participant)).to be true
        }
      end

      context 'when changing the role from facilitator to network partner' do
        let(:facilitator) {
          assessment.facilitators.sample
        }

        let(:user) {
          assessment.user
        }

        before(:each) do
          sign_in user
          put :update, assessment_id: assessment.id, id: facilitator.id,
              permissions: [{
                                level: 'network_partner',
                                email: facilitator.email
                            }]
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          expect(assessment.facilitator?(facilitator)).to be false
        }

        it {
          expect(assessment.network_partner?(facilitator)).to be true
        }
      end
    end

    context 'when not authenticated' do

      before(:each) do
        sign_out :user
        put :update, assessment_id: assessment.id, id: 1
      end

      it {
        is_expected.to respond_with :unauthorized
      }

    end

    context 'respond to PUT#update' do
      let(:brand_new_user) { FactoryGirl.create(:user) }

      it 'responds successfully to PUT#update' do
        assessment.facilitators << @facilitator

        sign_in @facilitator2

        put :update, assessment_id: assessment.id, id: @facilitator.id,
            permissions: [{level: "viewer", email: @facilitator.email}]

        expect(assessment.facilitator?(@facilitator)).to eq(false)
        expect(assessment.viewer?(@facilitator)).to eq(true)
        assert_response :success
      end

      it 'security: current_user should not be updated' do
        assessment.facilitators << @facilitator

        sign_in @facilitator

        put :update, assessment_id: assessment.id, id: @facilitator.id,
            permissions: [{level: "viewer", email: @facilitator.email}]

        expect(assessment.facilitator?(@facilitator)).to eq(true)
        expect(assessment.viewer?(@facilitator)).to eq(false)
      end

      it 'does not die with empty permissions' do
        assessment.facilitators << @facilitator

        sign_in @facilitator

        put :update, assessment_id: assessment.id, id: @facilitator.id

        assert_response :success
      end


    end
  end

  describe "PUT#deny PUT#accept permission" do

    let(:brand_new_user) { FactoryGirl.create(:user) }
    let(:ra) { Application.request_access_to_assessment(assessment: assessment, user: brand_new_user, roles: ["facilitator"]) }

    context 'PUT#deny' do

      it 'deny the permission request ' do
        ap = Assessments::Permission.new(assessment)
        sign_in @facilitator2

        put :deny, assessment_id: assessment.id, id: ra.id, email: brand_new_user.email

        assert_response :success
        expect(assessment.facilitator?(brand_new_user)).to eq(false)
        expect(ap.get_access_request(brand_new_user)).to eq(nil)
      end

      it 'unauthorized when is not logged in PUT#deny' do
        put :deny, assessment_id: assessment.id, id: 1
        assert_response :unauthorized
      end

      it 'forbid the deny request when no permissions to update PUT#deny' do
        sign_in @facilitator

        put :deny, assessment_id: assessment.id, id: ra.id, email: brand_new_user.email

        assert_response :forbidden
      end
    end

    context 'PUT#accept' do

      it 'PUT#accept' do
        sign_in @facilitator2

        put :accept, assessment_id: assessment.id, id: ra.id, email: brand_new_user.email

        assert_response :success
        expect(assessment.facilitator?(brand_new_user)).to eq(true)
      end

      it 'security: responds with 401 auth error PUT#accept' do
        put :accept, assessment_id: assessment.id, id: 1
        assert_response :unauthorized
      end

      it 'forbid the deny request when no permissions to update PUT#accept' do
        sign_in @facilitator

        put :accept, assessment_id: assessment.id, id: ra.id, email: brand_new_user.email

        assert_response :forbidden
      end

    end

  end

  describe "GET#current_level - for current_user" do

    it 'returns the current_user permission level' do
      sign_in @facilitator2

      assert_response :success
    end

    it 'security: responds with 401 auth error' do
      get :current_level, assessment_id: assessment.id
      assert_response :unauthorized
    end

  end

end
