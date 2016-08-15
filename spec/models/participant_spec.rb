# == Schema Information
#
# Table name: participants
#
#  id               :integer          not null, primary key
#  user_id          :integer
#  assessment_id    :integer
#  created_at       :datetime
#  updated_at       :datetime
#  invited_at       :datetime
#  reminded_at      :datetime
#  report_viewed_at :datetime
#

require 'spec_helper'

describe Participant do

  it {
    is_expected.to belong_to(:user)
  }

  it {
    is_expected.to belong_to(:assessment)
  }

  it {
    is_expected.to have_one(:response)
  }

  describe 'after save' do
    context 'when there is an assessment' do
      let(:participant) {
        build(:participant, :with_assessment)
      }

      it 'invokes flush_cached_version on the assessment' do
        expect(participant.assessment).to receive(:flush_cached_version)
        participant.save!
      end
    end

    context 'when there is no assessment' do
      let(:participant) {
        build(:participant)
      }

      # Because the assessment is nil, if we attempt to call a function on it, we would result
      # in a NoMethodError.  This is what we attempt to look for instead of seeing if
      # nil ever receives a message.
      it 'does not invoke flush_cached_version on the assessment' do
        expect { participant.save! }.not_to raise_error
      end
    end
  end

  describe 'before destroy' do
    context 'when an invitation for a given user exists' do
      let(:user) {
        create(:user)
      }

      let(:user_invitation) {
        create(:user_invitation, user: user, email: user.email)
      }

      let(:participant) {
        create(:participant, user: user, assessment: user_invitation.assessment)
      }

      before(:each) do
        participant.destroy
      end

      it {
        expect(UserInvitation.where(id: user_invitation.id)).to be_empty
      }
    end

    context 'when an invitation for a given user does not exist' do
      let(:user) {
        create(:user)
      }

      let(:user_invitation) {
        create(:user_invitation)
      }

      let(:participant) {
        create(:participant, user: user, assessment: user_invitation.assessment)
      }

      before(:each) do
        participant.destroy
      end

      it {
        expect(UserInvitation.find(user_invitation.id)).to eq user_invitation
      }
    end

    context 'when no user is attached to the participant' do
      let(:user) {
        nil
      }

      let(:user_invitation) {
        create(:user_invitation)
      }

      let(:participant) {
        create(:participant, user: user, assessment: user_invitation.assessment)
      }
      it {
        expect { participant.destroy }.not_to raise_error
      }
    end

    context 'when no assessment is attached to the participant' do
      let(:participant) {
        create(:participant, assessment: nil)
      }

      it {
        expect { participant.destroy }.not_to raise_error
      }
    end
  end
end
