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

    let(:first_user_response) {
      create(:response, :as_participant_responder, responder: assessment.participants.first)
    }

    let(:second_user_response) {
      create(:response, :as_participant_responder, responder: assessment.participants.last)
    }

    let(:assessment) {
      response.responder
    }

    context 'when pulling back all existing scores' do

      let!(:rubric) {
        create(:rubric, :with_questions_and_scores,
               question_count: 3,
               scores: [{
                            response: first_user_response,
                            value: 1,
                            evidence: 'expected'
                        },
                        {
                            response: second_user_response,
                            value: 1,
                            evidence: 'expected'
                        },
                        {
                            response: second_user_response,
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

      it {
        expect(assessment.answered_scores.count).to eq(3)
      }
    end

    context 'when a score does not contain evidence' do
      let!(:rubric) {
        create(:rubric, :with_questions_and_scores,
               question_count: 3,
               scores: [{
                            response: first_user_response,
                            value: 1,
                            evidence: ''
                        },
                        {
                            response: second_user_response,
                            value: 1,
                            evidence: 'expected'
                        },
                        {
                            response: second_user_response,
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

      it {
        expect(assessment.answered_scores.count).to eq(2)
      }
    end

    context 'when the score is skipped' do
      let!(:rubric) {
        create(:rubric, :with_questions_and_scores,
               question_count: 3,
               scores: [{
                            response: first_user_response,
                            value: nil,
                            evidence: 'needs evidence'
                        },
                        {
                            response: second_user_response,
                            value: 1,
                            evidence: 'expected'
                        },
                        {
                            response: second_user_response,
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

      it {
        expect(assessment.answered_scores.count).to eq(3)
      }
    end

    describe '#scores_for_team_role' do
      let(:response) {
        create(:response, :as_assessment_response, submitted_at: Time.now)
      }

      let(:assessment) {
        response.responder
      }

      context 'when there are no roles for any participants' do
        let(:first_user_response) {
          create(:response, :as_participant_responder, responder: assessment.participants.first)
        }

        let!(:rubric) {
          create(:rubric, :with_questions_and_scores,
                 scores: [{
                              response: first_user_response,
                              value: 1,
                              evidence: 'needs evidence'
                          }
                 ],
                 answers: [{
                               value: 1,
                               content: 'some content'
                           }]
          )
        }

        let(:team_role) {
          :worker
        }

        it {
          expect(assessment.scores_for_team_role(:worker).count).to eq 0
        }
      end

      context 'when there is a role for a participant' do
        context 'when the response is not skipped' do
          let(:participant_with_role) {
            p = assessment.participants.first
            p.user.update(team_role: :worker)
            p
          }

          let(:first_user_response) {
            create(:response, :as_participant_responder, responder: participant_with_role)
          }

          let!(:rubric) {
            create(:rubric, :with_questions_and_scores,
                   scores: [{
                                response: first_user_response,
                                value: 1,
                                evidence: 'needs evidence'
                            }

                   ],
                   answers: [{
                                 value: 1,
                                 content: 'some content'
                             }]
            )
          }

          let(:team_role) {
            :worker
          }

          it {
            expect(assessment.scores_for_team_role(:worker).count).to eq 1
          }
        end

        context 'when the response does not contain evidence' do
          let(:participant_with_role) {
            p = assessment.participants.first
            p.user.update(team_role: :worker)
            p
          }

          let(:first_user_response) {
            create(:response, :as_participant_responder, responder: participant_with_role)
          }

          let!(:rubric) {
            create(:rubric, :with_questions_and_scores,
                   scores: [{
                                response: first_user_response,
                                value: 1,
                                evidence: nil
                            }

                   ],
                   answers: [{
                                 value: 1,
                                 content: 'some content'
                             }]
            )
          }

          let(:team_role) {
            :worker
          }

          it {
            expect(assessment.scores_for_team_role(:worker).count).to eq 0
          }
        end
      end
    end

    describe '#team_roles_for_participants' do

      let(:assessment) {
        create(:assessment, :with_participants)
      }

      context 'when participants do not have roles' do
        it {
          expect(assessment.team_roles_for_participants).to be_empty
        }
      end

      context 'when participants have roles' do
        context 'when participants have the same role' do
          before(:each) do
            assessment.participants.first.user.update(team_role: :worker)
            assessment.participants.last.user.update(team_role: :worker)
          end

          it {
            expect(assessment.team_roles_for_participants).to eq ['worker']
          }
        end

        context 'when participants have different roles' do
          before(:each) do
            assessment.participants.first.user.update(team_role: :worker)
            assessment.participants.last.user.update(team_role: :non_worker)
          end

          it {
            expect(assessment.team_roles_for_participants.sort).to eq %w(worker non_worker).sort
          }
        end
      end
    end

    describe '#scores' do
      let(:response) {
        create(:response, :as_assessment_response, submitted_at: Time.now)
      }

      let(:assessment) {
        response.responder
      }

      let(:first_user_response) {
        create(:response, :as_participant_responder, responder: assessment.participants.first)
      }

      let!(:rubric) {
        create(:rubric, :with_questions_and_scores,
               scores: [{
                            response: first_user_response,
                            value: 1,
                            evidence: nil
                        }

               ],
               answers: [{
                             value: 1,
                             content: 'some content'
                         }]
        )
      }

      it {
        expect(assessment.scores(Question.first).count).to eq 1
      }
    end
  end

  describe '#score_count' do
    let(:response) {
      create(:response, :as_assessment_response, submitted_at: Time.now)
    }

    let(:assessment) {
      response.responder
    }

    let(:first_user_response) {
      create(:response, :as_participant_responder, :submitted, responder: assessment.participants.first)
    }

    context 'when scores for the given value do not exist' do
      let!(:rubric) {
        create(:rubric, :with_questions_and_scores,
               scores: [{
                            response: first_user_response,
                            value: 1,
                            evidence: 'evidenced'
                        }

               ],
               answers: [{
                             value: 1,
                             content: 'some content'
                         }]
        )
      }

      it {
        expect(assessment.score_count(Question.first, 10)).to eq 0
      }
    end

    context 'when scores for the given value exist' do

      let!(:rubric) {
        create(:rubric, :with_questions_and_scores,
               scores: [{
                            response: first_user_response,
                            value: 1,
                            evidence: 'It counts...'
                        }

               ],
               answers: [{
                             value: 1,
                             content: 'some content'
                         }]
        )
      }

      it {
        expect(assessment.score_count(Question.first, 1)).to eq 1
      }
    end
  end

  describe 'Assessment#assessments_for_user' do

    let(:district) {
      create(:district)
    }

    context 'when user has multiple assessments' do
      context 'when user does not have a role' do
        let(:user) {
          create(:user, districts: [district])
        }

        let!(:assessments) {
          create_list(:assessment, 3, :with_participants) do |assessment|
            assessment.participants << create(:participant, user: user)
            assessment.district = district
            assessment.save!
          end
        }

        it {
          expect(Assessment.assessments_for_user(user).size).to eq 3
        }
      end

      context 'when user has a role' do
        let(:user) {
          create(:user, districts: [district], role: :member)
        }

        let!(:assessments) {
          create_list(:assessment, 3, :with_participants) do |assessment|
            assessment.participants << create(:participant, user: user)
            assessment.district = district
            assessment.save!
          end
        }

        it {
          expect(Assessment.assessments_for_user(user).size).to eq 3
        }
      end
    end

    context 'when user is a network partner' do
      let(:user) {
        create(:user, districts: [district, other_district], role: :network_partner)
      }

      let(:other_district) {
        create(:district)
      }

      let!(:district_assessments) {
        create_list(:assessment, 3, :with_participants) do |assessment|
          assessment.participants << create(:participant, user: user)
          assessment.district = district
          assessment.save!
        end
      }

      let!(:other_district_assessments) {
        create_list(:assessment, 3, :with_participants) do |assessment|
          assessment.participants << create(:participant, user: user)
          assessment.district = other_district
          assessment.save!
        end
      }

      it {
        expect(Assessment.assessments_for_user(user).size).to eq 6
      }
    end
  end

  describe 'with data' do
    before { create_magic_assessments }
    let(:assessment) { @assessment_with_participants }



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
  
