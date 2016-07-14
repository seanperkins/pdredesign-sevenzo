require 'spec_helper'

describe V1::AssessmentsController do
  render_views

  before :each do
    request.env['HTTP_ACCEPT'] = 'application/json'
  end

  describe 'PUT #update' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:rubric) {
      assessment.rubric
    }

    let(:facilitator) {
      assessment.facilitators.sample
    }

    context 'when updating an existing assessment' do
      before(:each) do
        sign_in facilitator
        put :update, {id: assessment.id, rubric_id: assessment.rubric}
        assessment.reload
      end

      it {
        is_expected.to respond_with :success
      }

      it {
        expect(assessment.assigned_at).to be_nil
      }
    end

    context 'when updating an entire record' do
      let(:time) {
        Time.now
      }

      context 'when assign is not passed' do
        before(:each) do
          sign_in facilitator
          put :update, {id: assessment.id,
                        rubric_id: 9001,
                        name: 'some assessment',
                        due_date: time,
                        message: 'My message',
                        another_value: 'something',
                        report_takeaway: 'The takeaway'}
          assessment.reload
        end

        it {
          expect(assessment.rubric_id).to eq 9001
        }

        it {
          expect(assessment.name).to eq 'some assessment'
        }

        it {
          expect(assessment.message).to eq 'My message'
        }

        it {
          expect(assessment.due_date).to eq time.to_s
        }

        it {
          expect(assessment.report_takeaway).to eq 'The takeaway'
        }
      end

      context 'when assign is passed' do
        before(:each) do
          sign_in facilitator

          expect(AllParticipantsNotificationWorker).to receive(:perform_async)
                                                           .with(assessment.id)

          put :update, {id: assessment.id, assign: true}
          assessment.reload
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          expect(assessment.assigned_at).to_not be_nil
        }
      end
    end

    context 'when not the owner of the assessment' do
      let(:non_owner) {
        create(:user, :with_district)
      }

      before(:each) do
        sign_in non_owner
        put :update, {id: assessment.id, rubric_id: 10000}
      end

      it {
        is_expected.to respond_with :forbidden
      }
    end
  end

  describe 'GET #show' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:facilitator) {
      assessment.facilitators.sample
    }

    context 'when not authenticated' do
      before(:each) do
        sign_out :user
        get :show, id: assessment.id
      end

      it {
        is_expected.to respond_with :unauthorized
      }
    end

    context 'when not a participant of the assessment' do
      let(:user) {
        create(:user, :with_district)
      }

      before(:each) do
        sign_in user
        get :show, id: assessment.id
      end

      it {
        is_expected.to respond_with :forbidden
      }
    end

    context 'when authenticated' do
      context 'when message is not set on the assessment' do
        before(:each) do
          sign_in facilitator
          get :show, id: assessment.id
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          assigned = assigns(:assessment)
          expect(assigned.id).to eq assessment.id
        }

        it {
          expect(json['message'].empty?).to be false
        }
      end

      context 'when message is set on the assessment' do

        let(:assessment_with_message) {
          a = assessment
          a.update(message: 'welcome content')
          a
        }

        before(:each) do
          sign_in facilitator
          get :show, id: assessment_with_message.id
        end

        it {
          messages = assigns(:messages)
          expect(messages.count).to eq 1
        }

        it {
          messages = assigns(:messages)
          expect(messages.first.category).to eq('welcome')

        }

        it {
          messages = assigns(:messages)
          expect(messages.first.teaser).to eq('welcome content')
        }

        it {
          messages = assigns(:messages)
          expect(messages.first.sent_at).not_to be_nil
        }
      end

      context 'when report_takeaway is set on the assessment' do

        let(:assessment_with_report_takeaway) {
          a = assessment
          a.update(report_takeaway: 'expected takeaway')
          a
        }

        before(:each) do
          sign_in facilitator
          get :show, id: assessment_with_report_takeaway.id
        end

        it {
          expect(json['report_takeaway']).to eq('expected takeaway')
        }
      end
    end
  end

  describe 'GET #index' do
    let(:rubric) {
      create(:rubric)
    }

    let!(:assessment_list) {
      create_list(:assessment, 3, :with_participants, district: district_1, rubric: rubric)
    }

    let(:district_1) {
      create(:district)
    }

    let(:user) {
      create(:user, districts: [district_1])
    }

    context 'when the user is not authenticated' do

      before(:each) do
        sign_out :user
        get :index
      end

      it {
        is_expected.to respond_with :unauthorized
      }
    end

    context 'when the user is authenticated' do
      context 'when the user does not have a role' do
        before(:each) do
          user.update(role: nil)
          sign_in user

          get :index
        end

        it {
          is_expected.to respond_with :success
        }

        it {
          expect(assigns(:role)).to eq :district_member
        }
      end

      context 'when the user does have a role' do
        before(:each) do
          sign_in user
          get :index
        end

        it 'gets all assessments for their district' do
          result = assigns(:assessments)
          expect(result.count).to eq 3
        end
      end

      context 'when the assessment has responses' do
        let!(:assessment_response) {
          create(:response, responder: participant, rubric: rubric)
        }

        let(:assessment) {
          assessment_list.first
        }

        let(:participant) {
          create(:participant, user: user, assessment: assessment)
        }

        before(:each) do
          sign_in user
          get :index
        end

        it 'retrieves existing responses' do
          json_response = json.detect { |json_assessment| json_assessment['id'] == assessment.id }['responses'].first
          expect(json_response['id']).to eq assessment_response.id
        end
      end

      context 'when the user role is member' do

        let(:member_user) {
          create(:user, districts: [district_1, district_2])
        }

        let!(:additional_assessment) {
          create(:assessment, :with_participants, district: district_2)
        }

        let(:district_2) {
          create(:district)
        }

        before(:each) do
          sign_in member_user

          get :index
        end

        it {
          expect(assigns(:assessments).count).to eq 4
        }
      end
    end

    it 'returns is_participant if current_user is a participant' do
      sign_in @user
      get :index

      expect(json.first["is_participant"]).to eq(true)
    end


    it 'returns a consensus_id and submitted_at if present' do
      time = Time.now
      consensus = Response.create(responder_id: @assessment_with_participants.id,
                                  responder_type: 'Assessment',
                                  rubric: @rubric,
                                  submitted_at: time)
      sign_in @user
      get :index

      json_response = json.first
      expect(json_response["consensus"]["id"]).to eq(consensus.id)
      expect(json_response["consensus"]["submitted_at"]).not_to be_nil

    end

    it 'doesnt error on deleted participants user' do
      assessment.participants.first.user.delete

      sign_in @facilitator
      get :index

      assert_response :success
    end
  end

  describe 'POST #create' do
    before { create_magic_assessments }
    before { sign_in @facilitator }
    let(:assessment) { @assessment_with_participants }

    before do
      assessment.update(facilitators: [@facilitator])
    end

    it 'allows a facilitator to create an assessment' do
      post :create,
           name: 'some assessment',
           rubric_id: @rubric.id,
           due_date: Time.now

      assert_response :success
    end

    it 'sets the facilitator correctly' do
      post :create,
           name: 'some assessment',
           rubric_id: @rubric.id,
           due_date: Time.now

      expect(json["facilitator"]["id"]).to eq(@facilitator.id)
    end

    it 'district member is assigned as a participant automatically' do
      post :create,
           name: 'some assessment',
           rubric_id: @rubric.id,
           due_date: Time.now

      assessment = Assessment.find(json["id"])

      expect(assessment.participant?(@facilitator)).to eq(true)
    end

    it 'district member is assigned as a participant automatically' do
      @facilitator.update(role: :network_partner)

      post :create,
           name: 'some assessment',
           rubric_id: @rubric.id,
           due_date: Time.now

      assessment = Assessment.find(json["id"])

      expect(assessment.participant?(@facilitator)).to eq(false)
    end


    it 'creates a record' do
      post :create,
           name: 'some assessment',
           rubric_id: @rubric.id,
           due_date: Time.now

      expect(json["id"]).not_to be_nil
    end

    it 'sets the newest rubric if one is not provided' do
      @rubric = create(:rubric, :as_assessment_rubric, version: 99)
      create(:rubric, :as_assessment_rubric, version: 95)

      create_struct

      post :create,
           name: 'some assessment',
           due_date: Time.now

      expect(json["rubric_id"]).to eq(@rubric.id)
    end

    it 'allows to set the district_id' do
      district = District.create!
      Rubric.create!(version: 95)
      create_struct

      post :create,
           name: 'some assessment',
           due_date: Time.now,
           district_id: district.id

      expect(json["district_id"]).to eq(district.id)
    end

    it 'returns json errors when an assessment cant be created' do
      post :create,
           rubric_id: @rubric.id,
           due_date: Time.now

      expect(json["errors"]["name"]).to include("can't be blank")
    end
  end
end
