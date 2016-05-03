require 'spec_helper'

describe ResponseAuthorizer do
  describe '#creatable_by?' do
    let(:user) {
      create(:user)
    }

    context 'without a responder entity' do
      subject { described_class }

      let(:response_obj) {
        create(:response)
      }

      it { is_expected.not_to be_creatable_by(user) }
    end

    context 'when the responder is an assessment' do
      context 'when user is not a facilitator' do
        let!(:establish_user_membership) {
          create(:participant, user: user, assessment: response.responder)
          response.responder.user = create(:user)
          response.responder.save!
        }

        let(:response) {
          create(:response, :as_assessment_response)
        }

        subject {
          response.authorizer
        }

        it { is_expected.not_to be_creatable_by(user) }
      end

      context 'when user is not an owner' do

        let(:owner) {
          create(:user)
        }

        let!(:set_owner) {
          response.responder.user = owner
          response.responder.user.save!
        }

        let(:response) {
          create(:response, :as_assessment_response)
        }

        subject {
          response.authorizer
        }

        it { is_expected.not_to be_creatable_by(user) }
      end


      context 'when user is an owner' do

        let!(:establish_owner) {
          response.responder.user = user
          response.responder.save!
        }

        let(:response) {
          create(:response, :as_assessment_response)
        }

        subject {
          response.authorizer
        }

        it { is_expected.to be_creatable_by(user) }
      end

      context 'when user is a facilitator' do
        let!(:establish_user_membership) {
          response.responder.facilitators << user
          response.responder.user = create(:user)
          response.responder.save!
        }

        let(:response) {
          create(:response, :as_assessment_response)
        }

        subject {
          response.authorizer
        }

        it { is_expected.to be_creatable_by(user) }
      end
    end

    context 'when the responder is an analysis' do
      context 'when user is not a facilitator' do
        let!(:establish_user_membership) {
          create(:analysis_member, :as_participant, user: user, analysis: response.responder)
        }

        let(:response) {
          create(:response, :as_analysis_response)
        }

        subject {
          response.authorizer
        }

        it { is_expected.not_to be_creatable_by(user) }
      end

      context 'when user is a facilitator' do
        let!(:establish_user_membership) {
          create(:analysis_member, :as_facilitator, user: user, analysis: response.responder)
        }

        let(:response) {
          create(:response, :as_analysis_response)
        }

        subject {
          response.authorizer
        }

        it { is_expected.to be_creatable_by(user) }
      end
    end

    context 'when the responder is a Participant' do
      context 'when the user ID does not match' do
        let(:response) {
          create(:response, :as_participant_response)
        }

        subject {
          response.authorizer
        }

        it { is_expected.not_to be_creatable_by(user) }
      end

      context 'when the user ID matches' do

        let!(:establish_participant_ownership) {
          response.responder.user = user
          response.responder.save!
        }

        let(:response) {
          create(:response, :as_participant_response)
        }

        subject {
          response.authorizer
        }

        it { is_expected.to be_creatable_by(user) }
      end
    end
  end
end
