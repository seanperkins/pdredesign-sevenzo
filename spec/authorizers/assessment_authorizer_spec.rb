require 'spec_helper'

describe AssessmentAuthorizer do

  let(:assessment) {
    create(:assessment, :with_facilitators, :with_participants, participants: 3, facilitators: 3)
  }

  let(:facilitator) {
    assessment.facilitators.first
  }

  let(:participant) {
    assessment.participants.first
  }

  let(:owner) {
    assessment.user
  }

  let(:other) {
    create(:user, :with_district)
  }

  let(:user) {
    create(:user, districts: [assessment.district])
  }

  subject {
    assessment
  }

  describe 'create' do

    it {
      is_expected.to be_creatable_by(facilitator)
    }

    it {
      is_expected.to be_creatable_by(user)
    }

    it {
      is_expected.to be_creatable_by(other)
    }
  end

  describe 'read' do
    it {
      is_expected.to be_readable_by(facilitator)
    }

    it {
      is_expected.to be_readable_by(user)
    }

    it {
      is_expected.not_to be_readable_by(other)
    }
  end

  describe 'update' do
    it {
      is_expected.to be_updatable_by(facilitator)
    }

    it {
      is_expected.to be_updatable_by(owner)
    }

    it {
      is_expected.not_to be_updatable_by(user)
    }

    it {
      is_expected.not_to be_updatable_by(other)
    }
  end

  describe 'delete' do
    it {
      is_expected.to be_deletable_by(facilitator)
    }

    it {
      is_expected.not_to be_deletable_by(participant)
    }

    it {
      is_expected.not_to be_deletable_by(other)
    }
  end
end
