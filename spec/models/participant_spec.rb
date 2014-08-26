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
  before           { create_magic_assessments }
  before           { create_responses }
  let(:assessment) { @assessment_with_participants }
  let(:subject) { Participant }

  describe '#remote_invitation' do
    it 'deletes other user invitations' do
      double = double('invitations')
      expect(double).to receive(:destroy_all)

      expect(UserInvitation).to receive(:where)
        .with(email: @user.email, assessment: anything)
        .and_return(double)

      @participant.destroy
    end

    it 'doesnt fail and cause a chain fail for destory' do
      @participant.update(user: nil)
      @participant.destroy
    end
  end

end
