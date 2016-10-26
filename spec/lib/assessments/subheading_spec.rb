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
        Set.new([assessment.user] + assessment.facilitators)
      }

      it {
        expect(assessments_subheading.execute[:message]).to eq 'Invited by:'
      }

      it {
        expect(Set.new(assessments_subheading.execute[:members])).to eq facilitators
      }
    end

    context 'when user is a facilitator' do
      let(:user) {
        assessment.facilitators.sample.user
      }

      let(:assessments_subheading) {
        Assessments::Subheading.new(assessment, user)
      }

      context 'when the assessment is in the consensus state' do
        before(:each) do
          allow(assessment).to receive(:status).and_return :consensus
        end

        it {
          expect(assessments_subheading.execute[:message]).to eq 'Viewed report:'
        }

        it {
          expect(assessments_subheading.execute[:members]).to be_empty
        }
      end

      context 'when the assessment is not in the consensus state' do
        let(:participants) {
          Set.new(assessment.participants.map(&:user))
        }

        before(:each) do
          allow(assessment).to receive(:status).and_return :assessment
        end

        it {
          expect(assessments_subheading.execute[:message]).to eq 'Not yet submitted:'
        }

        it {
          expect(Set.new(assessments_subheading.execute[:members])).to eq participants
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
        Set.new([assessment.user] + assessment.facilitators)
      }

      it {
        expect(assessments_subheading.execute[:message]).to eq 'Facilitated by:'
      }

      it {
        expect(Set.new(assessments_subheading.execute[:members])).to eq facilitators
      }
    end
  end
end
