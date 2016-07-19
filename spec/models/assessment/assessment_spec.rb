# == Schema Information
#
# Table name: assessments
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  due_date        :datetime
#  meeting_date    :datetime
#  user_id         :integer
#  rubric_id       :integer
#  created_at      :datetime
#  updated_at      :datetime
#  district_id     :integer
#  message         :text
#  assigned_at     :datetime
#  mandrill_id     :string(255)
#  mandrill_html   :text
#  report_takeaway :text
#

require 'spec_helper'

describe Assessment do
  it {
    is_expected.to validate_presence_of :name
  }

  it {
    is_expected.to validate_presence_of :rubric_id
  }

  it {
    is_expected.to validate_presence_of :district_id
  }

  context 'when assigned_at is present' do
    context 'when due_date is invalid' do
      let(:participants) {
        create_list(:participant, 2)
      }

      let(:assessment) {
        build(:assessment, participants: participants, assigned_at: Time.now, message: 'msg')
      }

      before(:each) do
        assessment.save
      end

      it {
        expect(assessment.valid?).to be false
      }

      it {
        expect(assessment.errors[:due_date]).to include 'can\'t be blank'
      }
    end

    context 'when message is invalid' do
      let(:participants) {
        create_list(:participant, 2)
      }

      let(:assessment) {
        build(:assessment, participants: participants, assigned_at: Time.now, due_date: 5.days.from_now)
      }

      before(:each) do
        assessment.save
      end

      it {
        expect(assessment.valid?).to be false
      }

      it {
        expect(assessment.errors[:message]).to include 'can\'t be blank'
      }
    end

    context 'when no participants are attached' do
      let(:assessment) {
        build(:assessment, assigned_at: Time.now, due_date: 5.days.from_now, message: 'msg')
      }

      before(:each) do
        assessment.save
      end

      it {
        expect(assessment.valid?).to be false
      }

      it {
        expect(assessment.errors[:participant_ids]).to include 'You must assign participants to this assessment.'
      }
    end

    context 'when all fields are specified' do
      let(:participants) {
        create_list(:participant, 2)
      }

      let(:assessment) {
        build(:assessment, participants: participants, assigned_at: Time.now, due_date: 5.days.from_now, message: 'msg')
      }

      before(:each) do
        assessment.save
      end

      it {
        expect(assessment.valid?).to be true
      }
    end
  end

  describe '#pending_requests?' do
    context 'on an assessment without any outstanding requests' do
      let(:access_request) {
        create(:access_request)
      }

      let(:assessment) {
        create(:assessment, :with_participants)
      }

      let(:user) {
        access_request.user
      }

      it {
        expect(assessment.pending_requests?(user)).to be false
      }
    end

    context 'on an assessment with outstanding requests' do
      let(:access_request) {
        create(:access_request)
      }

      let(:assessment) {
        access_request.assessment
      }

      let(:user) {
        access_request.user
      }

      it {
        expect(assessment.pending_requests?(user)).to be true
      }
    end
  end

  describe '#completed?' do
    context 'when percent_completed is equal to 100' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      it {
        allow(assessment).to receive(:percent_completed).and_return 100
        expect(assessment.completed?).to be true
      }
    end

    context 'when percent_completed is less than 100' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      it {
        allow(assessment).to receive(:percent_completed).and_return 99
        expect(assessment.completed?).to be false
      }
    end

    context 'when percent_completed is greater than 100' do
      let(:assessment) {
        create(:assessment, :with_participants)
      }

      it {
        allow(assessment).to receive(:percent_completed).and_return 101
        expect(assessment.completed?).to be false
      }
    end
  end

  describe '#status' do
    context 'when assigned_at is nil' do
      let(:assessment) {
        create(:assessment, :with_participants, assigned_at: nil)
      }

      it {
        expect(assessment.status).to eq :draft
      }
    end

    context 'when response is present' do
      let(:assessment) {
        create(:assessment, :with_participants, :with_response)
      }

      it {
        expect(assessment.status).to eq :consensus
      }
    end

    context 'when assigned_at is not nil and response is absent' do
      let(:assessment) {
        create(:assessment, :with_participants, assigned_at: Time.now)
      }

      it {
        expect(assessment.status).to eq :assessment
      }
    end
  end

  describe '#share_token' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:original_share_token) {
      assessment.share_token
    }

    it {
      expect(assessment.share_token).not_to be_empty
    }

    describe 'when saved again' do
      before(:each) do
        assessment.save!
      end

      it {
        expect(assessment.share_token).to eq original_share_token
      }
    end
  end

  describe '#answered_scores' do
    let(:response) {
      create(:response, :as_assessment_response, submitted_at: Time.now)
    }

    let(:assessment) {
      response.responder
    }

    let!(:rubric) {
      create(:rubric, :with_questions_and_scores,
             question_count: 3,
             scores: [{
                          response: response,
                          value: 1,
                          evidence: 'expected'
                      },
                      {
                          response: response,
                          value: 1,
                          evidence: 'expected'
                      },
                      {
                          response: response,
                          value: 1,
                          evidence: 'expected'
                      }
             ],
             answers: [{
                           value: 1,
                           content: 'some content'
                       },
                       {
                           value: 2,
                           content: 'some content'
                       },
                       {
                           value: 3,
                           content: 'some content'
                       },
                       {
                           value: 4,
                           content: 'some content'
                       }]
      )
    }

    # before { create_magic_assessments }
    # before do
    #   create_struct
    #   Response
    #     .find(99)
    #     .update(responder: @participant, submitted_at: Time.now)
    # end

    it 'returns all the scores for an assessment' do
      expect(assessment.answered_scores.count).to eq(3)
    end

    it 'does not count Assessment scores' do
      Response.create(responder_id: assessment.id,
                      responder_type: 'Assessment',
                      submitted_at: Time.now,
                      id: 42)

      expect(assessment.answered_scores.count).to eq(3)
    end

    it 'does not return nil scores' do
      Score.first.update(value: nil, evidence: '')
      expect(assessment.answered_scores.count).to eq(2)
    end

    it 'returns skipped scores' do
      Score.first.update(value: nil)
      expect(assessment.answered_scores.count).to eq(3)
    end

    describe '#scores_for_team_role' do
      let(:assessment) { @assessment_with_participants }
      before { create_magic_assessments }

      before do
        create_struct

        Response
            .find(99)
            .update(responder: @participant, submitted_at: Time.now)
      end

      it 'returns scores for the specified :team_role' do
        expect(assessment.scores_for_team_role(:worker).count).to eq(0)

        @user.update(team_role: :worker)

        expect(assessment.scores_for_team_role(:worker).count).to eq(3)
      end

      it 'returns an empty array when users dont have roles' do
        expect(assessment.scores_for_team_role(:worker)).to eq([])
      end

      it 'does not return nil scores' do
        assessment.answered_scores.first.update(value: nil, evidence: nil)

        @user.update(team_role: :worker)
        expect(assessment.scores_for_team_role(:worker).count).to eq(2)
      end
    end

    describe '#team_roles_for_participants' do
      let(:assessment) { @assessment_with_participants }
      before { create_magic_assessments }

      before do
        create_struct

        Response
            .find(99)
            .update(responder: @participant, submitted_at: Time.now)
      end

      it 'returns distinct roles for all answered scores participant' do
        @user.update(team_role: :worker)
        @user2.update(team_role: :worker)

        expect(assessment.team_roles_for_participants).to eq(["worker"])

        @user.update(team_role: :non_worker)
        @user2.update(team_role: :worker)
        expect(assessment.team_roles_for_participants).to include("non_worker")
        expect(assessment.team_roles_for_participants).to include("worker")
      end

      it 'returns an empty array for nil participants' do
        expect(assessment.team_roles_for_participants).to eq([])
      end
    end

    describe '#scores' do
      it 'returns scores for a particular question id' do
        question = Question.find_by(headline: "headline 1")
        expect(assessment.scores(question.id).count).to eq(1)
      end
    end
  end

  describe '#score_count' do
    before { create_magic_assessments }
    before { create_struct }
    before { create_responses }

    let(:assessment) { @assessment_with_participants }

    it 'returns the number of scores for a question + response' do
      question = Question.find_by(headline: "question1")
      expect(assessment.score_count(question, 1)).to eq(1)
    end
  end

  describe 'with data' do
    before { create_magic_assessments }
    let(:assessment) { @assessment_with_participants }

    context '#assessments_for_user' do
      it 'returns all assessments for district_members' do
        records = Assessment.assessments_for_user(@facilitator)
        expect(records.count).to eq(3)

        @facilitator.update(role: :member)
        records = Assessment.assessments_for_user(@facilitator)
        expect(records.count).to eq(3)
      end

      it 'returns all assessments in every district for network_partners' do
        @user.update(role: :network_partner)
        @user.update(district_ids: [@district.id])

        records = Assessment.assessments_for_user(@user)
        expect(records.count).to eq(3)

        @user.update(district_ids: [@district.id, @district2.id])
        records = Assessment.assessments_for_user(@user)
        expect(records.count).to eq(4)
      end
    end

    context '#participant?' do
      it 'returns true when a user is a participant of an assessment' do
        expect(assessment.participant?(@user)).to eq(true)
      end

      it 'returns true when a user is a participant of an assessment' do
        assessment.participants.find_by(user_id: @user.id).destroy
        expect(assessment.participant?(@user)).to eq(false)
      end
    end

    context '#has_access?' do
      it 'returns true when a user is a participant of an assessment' do
        expect(assessment.has_access?(@user)).to eq(true)
      end

      it 'returns false when a user is not a participant of an assessment' do
        assessment.participants.find_by(user_id: @user.id).destroy
        expect(assessment.has_access?(@user)).to eq(false)
      end

      it 'returns true when a user is a facilitator of an assessment' do
        assessment.participants.find_by(user_id: @user.id).destroy
        assessment.facilitators[0].id = @user.id
        expect(assessment.has_access?(@user)).to eq(true)
      end
    end

    context 'with consensus' do
      before do
        @consensus = Response
                         .create(responder_type: 'Assessment',
                                 responder: @assessment_with_participants)

      end

      context '#consensus' do
        it 'returns the consensus' do
          consensus = assessment.consensus
          expect(consensus.id).to eq(@consensus.id)
        end

        it 'returns nil whne consensus is not present' do
          @consensus.destroy
          consensus = assessment.consensus
          expect(consensus).to eq(nil)
        end
      end
    end

    context 'with response' do
      before do
        @response = Response
                        .create(responder_type: 'Participant',
                                responder: @participant)
      end

      def response_count(method)
        assessment.send(method).count
      end

      context '#responses' do
        it 'returns the users response' do
          responses = assessment.responses(@user)
          expect(responses.count).to eq(1)
          expect(responses.first.id).to eq(@response.id)
        end
      end

      describe '#participant_response' do
        it 'returns the participants submitted responses' do
          expect do
            @response.update(submitted_at: Time.now)
          end.to change { response_count(:participant_responses) }.by(1)
        end
      end

      describe '#participants_not_responded' do
        it 'returns the participants that have not responded' do
          expect do
            @response.update(submitted_at: Time.now)
          end.to change { response_count(:participants_not_responded) }.by(-1)
        end
      end

      describe '#participants_viewed_report' do
        it 'gets users who have viewed the report' do
          expect do
            @participant.update(report_viewed_at: Time.now)
          end.to change { response_count(:participants_viewed_report) }.by(1)
        end
      end

      describe '#response_submitted' do
        before do
          @response = Response.create(responder_type: 'Assessment',
                                      responder: @facilitator2)
          assessment.update(response: @response)
        end

        it 'returns true when a response is submitted' do
          @response.update(submitted_at: Time.now)
          expect(assessment.response_submitted?).to eq(true)
        end

        it 'returns false when a response isnt submitted' do
          expect(assessment.response_submitted?).to eq(false)
        end
      end

      describe '#percent_completed' do
        it 'gets 0% complete' do
          expect(assessment.percent_completed).to eq(0.0)
        end

        it 'gets 50% complete' do
          @response.update(submitted_at: Time.now)
          expect(assessment.percent_completed).to eq(50.0)
        end

        it 'gets 100% complete' do
          Response.create(responder_type: 'Participant',
                          responder: @participant2,
                          submitted_at: Time.now)

          @response.update(submitted_at: Time.now)
          expect(assessment.percent_completed).to eq(100.0)
        end
      end
    end

    context "#flush_cached_version" do
      before { create_magic_assessments }
      let(:assessment) { @assessment_with_participants }

      it { is_expected.to respond_to(:flush_cached_version) }

      it "should touch the assessment and change the updated_at for the assessment" do
        uab = assessment.updated_at
        assessment.flush_cached_version
        assessment.reload
        expect(assessment.updated_at).not_to eq(uab)
      end
    end

    describe '#all_users' do
      before { create_magic_assessments }
      let(:assessment) { @assessment_with_participants }

      it 'returns all the users involved in the assessment (participants, viewers, network_partners, facilitators)' do
        assessment.facilitators << @facilitator

        au = assessment.all_users
        expect(au).to include(assessment.participants.first.user)
        expect(au).to include(@facilitator)
        expect(au).not_to include(assessment.user) #not to include owner
      end

      it 'results inside of all_users method should not be repeated' do
        participant = assessment.participants.first.user
        assessment.facilitators << participant

        expect(assessment.all_users).to include_only_one_of(participant)
      end
    end

  end

end
  
