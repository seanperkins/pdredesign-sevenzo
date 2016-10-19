require 'spec_helper'

describe AnalysisAuthorizer do

  subject {
    analysis
  }

  let(:participant) {
    user = create(:user, :with_district)
    create(:tool_member, :as_participant, user: user, tool: analysis)
    user
  }

  let(:facilitator) {
    user = create(:user, :with_district)
    create(:tool_member, :as_facilitator, user: user, tool: analysis)
    user
  }

  let(:other_user) {
    create(:user, :with_district)
  }

  let(:analysis) {
    create(:analysis)
  }

  context 'when reading an analysis' do
    context 'when the user is a participant' do
      it {
        is_expected.to be_readable_by(participant)
      }
    end

    context 'when the user is a facilitator' do
      it {
        is_expected.to be_readable_by(facilitator)
      }
    end
  end

  context 'when creating an analysis' do
    context 'when the user is not a member of the assessment' do
      it {
        is_expected.to be_creatable_by(other_user)
      }
    end
  end

  context 'when updating an analysis' do
    context 'when the user is a participant' do
      it {
        is_expected.not_to be_updatable_by(participant)
      }
    end

    context 'when the user is a facilitator' do
      it {
        is_expected.to be_updatable_by(facilitator)
      }
    end
  end

  context 'when deleting an analysis' do
    context 'when the user is a participant' do
      it {
        is_expected.not_to be_deletable_by(participant)
      }
    end

    context 'when the user is a facilitator' do
      it {
        is_expected.to be_deletable_by(facilitator)
      }
    end
  end
end
