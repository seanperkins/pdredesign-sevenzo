require 'spec_helper'

describe Assessments::Subheading do
  let(:assessment) {
    create(:assessment, :with_participants)
  }

  describe '#execute' do
    context 'when user is a participant' do
      let(:user) {
        assessment.participants.sample.user
      }

      let(:assessments_subheading) {
        Assessments::Subheading.new(assessment, user)
      }

      let(:facilitators) {
        [assessment.user] + assessment.facilitators
      }

      it {
        expect(assessments_subheading.execute).to eq({
                                                         message: 'Invited by:',
                                                         members: facilitators
                                                     })
      }
    end

    context 'when user is a facilitator' do
      let(:user) {
        assessment.facilitators.sample
      }

      let(:assessments_subheading) {
        Assessments::Subheading.new(assessment, user)
      }

      context 'when the assessment is in the consensus state' do
        let(:participants) {
          []
        }

        before(:each) do
          allow(assessment).to receive(:status).and_return :consensus
        end

        it {
          expect(assessments_subheading.execute).to eq({
                                                           message: 'Viewed report:',
                                                           members: participants
                                                       })
        }
      end

      context 'when the assessment is not in the consensus state' do
        let(:participants) {
          assessment.participants.order(user_id: :desc).map(&:user)
        }

        before(:each) do
          allow(assessment).to receive(:status).and_return :assessment
        end

        it {
          expect(assessments_subheading.execute).to eq({
                                                           message: 'Not yet submitted:',
                                                           members: participants
                                                       })
        }
      end
    end

    context 'when the user is a network partner' do
      let(:user) {
        u = create(:user, :with_network_partner_role, :with_district)
        assessment.network_partners << u
        u
      }

      let(:assessments_subheading) {
        Assessments::Subheading.new(assessment, user)
      }

      let(:facilitators) {
        [assessment.user] + assessment.facilitators
      }

      it {
        expect(assessments_subheading.execute).to eq({
                                                         message: 'Facilitated by:',
                                                         members: facilitators
                                                     })
      }
    end
  end
end
