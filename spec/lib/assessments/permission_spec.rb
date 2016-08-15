require 'spec_helper'

describe Assessments::Permission do
  describe '#initialize' do
    let(:assessment) {
      create(:assessment)
    }

    it {
      expect(Assessments::Permission.new(assessment).assessment).to eq assessment
    }
  end

  describe '#available_permissions' do
    it {
      expect(Assessments::Permission.available_permissions).to eq [:facilitator, :participant]
    }
  end

  describe '#request_access' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:user) {
      create(:user, :with_district)
    }

    before(:each) do
      Assessments::Permission.request_access(
          user: user,
          roles: 'facilitator',
          assessment_id: assessment.id)
    end

    it {
      expect(AccessRequest.find_by(assessment_id: assessment.id, user_id: user.id)).not_to be_nil
    }
  end

  describe '#requested' do
    let(:access_request) {
      create(:access_request)
    }

    let(:access_permission) {
      Assessments::Permission.new(assessment)
    }

    let(:assessment) {
      access_request.assessment
    }

    it {
      expect(access_permission.requested.first).to eq access_request
    }
  end

  describe '#get_access_request' do
    let(:access_request) {
      create(:access_request)
    }

    let(:assessment) {
      access_request.assessment
    }

    let(:access_permission) {
      Assessments::Permission.new(assessment)
    }

    context 'when the user is a member of the request' do
      let(:user) {
        access_request.user
      }

      it {
        expect(access_permission.get_access_request(user)).to eq access_request
      }
    end

    context 'when the user is not a member of the request' do
      let(:user) {
        create(:user, :with_district)
      }

      it {
        expect(access_permission.get_access_request(user)).to be_nil
      }
    end
  end

  describe '#possible_roles_permissions' do
    let(:assessment_permission) {
      Assessments::Permission.new(assessment)
    }

    let(:assessment) {
      create(:assessment, :with_participants)
    }


    let(:user) {
      create(:user, :with_district)
    }

    context 'when the user is a participant' do
      let!(:participant) {
        create(:participant, user: user, assessment: assessment)
      }

      it {
        expect(assessment_permission.possible_roles_permissions(user)).to eq [:facilitator]
      }
    end

    context 'when the user is a facilitator' do
      before(:each) do
        assessment.facilitators << user
      end

      it {
        expect(assessment_permission.possible_roles_permissions(user)).to eq [:participant]
      }
    end
  end

  describe '#get_level' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:assessment_permission) {
      Assessments::Permission.new(assessment)
    }

    context 'when the user is a facilitator' do
      let(:user) {
        assessment.facilitators.sample
      }

      it {
        expect(assessment_permission.get_level(user)).to eq :facilitator
      }
    end

    context 'when the user is a participant' do
      let(:user) {
        assessment.participants.sample.user
      }

      it {
        expect(assessment_permission.get_level(user)).to eq :participant
      }
    end

    context 'when the user is a network partner' do
      let(:user) {
        u = create(:user, :with_network_partner_role)
        assessment.network_partners << u
        u
      }

      it {
        expect(assessment_permission.get_level(user)).to eq :network_partner
      }
    end
  end

  describe '#add_level' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:assessment_permission) {
      Assessments::Permission.new(assessment)
    }

    let(:user) {
      create(:user)
    }

    context 'when adding a facilitator' do
      before(:each) do
        expect(AccessGrantedNotificationWorker).to receive(:perform_async).with(assessment.id, user.id, :facilitator)
        assessment_permission.add_level(user, :facilitator)
      end

      it {
        expect(assessment.facilitators.include?(user)).to be true
      }
    end

    context 'when adding a network partner' do
      before(:each) do
        expect(AccessGrantedNotificationWorker).to receive(:perform_async).with(assessment.id, user.id, :network_partner)
        assessment_permission.add_level(user, :network_partner)
      end

      it {
        expect(assessment.network_partners.include?(user)).to be true
      }
    end

    context 'when adding a viewer' do
      before(:each) do
        expect(AccessGrantedNotificationWorker).to receive(:perform_async).with(assessment.id, user.id, :viewer)
        assessment_permission.add_level(user, :viewer)
      end

      it {
        expect(assessment.viewers.include?(user)).to be true
      }
    end

    context 'when adding any other level' do

      before(:each) do
        expect(AccessGrantedNotificationWorker).not_to receive(:perform_async).with(assessment.id, user.id, :admin)
      end

      it {
        expect(assessment_permission.add_level(user, :admin)).to be false
      }
    end
  end

  describe '#update_level' do
    let(:assessment) {
      create(:assessment, :with_participants)
    }

    let(:assessment_permission) {
      Assessments::Permission.new(assessment)
    }

    context 'when the user is the owner of the assessment' do
      let(:user) {
        assessment.user
      }

      context 'when attempting to update to network partner' do
        let(:level) {
          :network_partner
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.network_partner?(user)).to be false
        }
      end

      context 'when attempting to update to viewer' do
        let(:level) {
          :viewer
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.viewer?(user)).to be false
        }
      end

      context 'when attempting to update to participant' do
        let(:level) {
          :participant
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.participant?(user)).to be false
        }
      end
    end

    context 'when the user is a facilitator of the assessment' do
      let(:user) {
        assessment.facilitators.sample
      }

      context 'when attempting to update to network partner' do
        let(:level) {
          :network_partner
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.network_partner?(user)).to be true
        }
      end

      context 'when attempting to update to viewer' do
        let(:level) {
          :viewer
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.viewer?(user)).to be true
        }
      end

      context 'when attempting to update to participant' do
        let(:level) {
          :participant
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.participant?(user)).to be false
        }
      end
    end

    context 'when the user is a participant of the assessment' do
      let(:user) {
        assessment.participants.sample.user
      }

      context 'when attempting to update to network partner' do
        let(:level) {
          :network_partner
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.network_partner?(user)).to be true
        }
      end

      context 'when attempting to update to viewer' do
        let(:level) {
          :viewer
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.viewer?(user)).to be true
        }
      end

      context 'when attempting to update to facilitator' do
        let(:level) {
          :facilitator
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.facilitator?(user)).to be true
        }
      end
    end

    context 'when the user is a network partner of the assessment' do
      let(:user) {
        u = create(:user, :with_network_partner_role)
        assessment.network_partners << u
        u
      }

      context 'when attempting to update to participant' do
        let(:level) {
          :participant
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.participant?(user)).to be false
        }
      end

      context 'when attempting to update to viewer' do
        let(:level) {
          :viewer
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.viewer?(user)).to be true
        }
      end

      context 'when attempting to update to facilitator' do
        let(:level) {
          :facilitator
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.facilitator?(user)).to be true
        }
      end
    end

    context 'when the user is a viewer of the assessment' do
      let(:user) {
        u = create(:user, :with_district)
        assessment.viewers << u
        u
      }

      context 'when attempting to update to network partner' do
        let(:level) {
          :network_partner
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.network_partner?(user)).to be true
        }
      end

      context 'when attempting to update to viewer' do
        let(:level) {
          :viewer
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.viewer?(user)).to be true
        }
      end

      context 'when attempting to update to facilitator' do
        let(:level) {
          :facilitator
        }

        before(:each) do
          assessment_permission.update_level(user, level)
        end

        it {
          expect(assessment.facilitator?(user)).to be true
        }
      end
    end

    context 'when updating to the same role' do
      let(:user) {
        assessment.facilitators.sample
      }

      let(:level) {
        :facilitator
      }

      it {
        expect(assessment_permission).not_to receive(:revoke_level).with(user)
        expect(assessment_permission).not_to receive(:add_level).with(user, level)
        assessment_permission.update_level(user, level)
      }
    end
  end

  describe '#deny' do
    let(:assessment_permission) {
      Assessments::Permission.new(assessment)
    }

    let(:assessment) {
      access_request.assessment
    }

    let(:user) {
      access_request.user
    }

    let(:access_request) {
      create(:access_request)
    }

    before(:each) do
      assessment_permission.deny(user)
    end

    it {
      expect(AccessRequest.find_by(assessment: assessment, user: user)).to be_nil
    }
  end

  describe '#accept_permission_requested' do

    let(:assessment_permission) {
      Assessments::Permission.new(assessment)
    }

    let(:assessment) {
      access_request.assessment
    }

    let(:access_request) {
      create(:access_request)
    }

    let(:user) {
      access_request.user
    }

    it {
      expect(AccessGrantedNotificationWorker).to receive(:perform_async)
      assessment_permission.accept_permission_requested(user)
      expect(assessment.facilitator?(user)).to be true
    }

    it {
      expect(assessment_permission.requested).to include(access_request)
    }
  end

  describe '#accept_permission_requested' do
    context 'when the access request is for a participant' do
      let(:access_request) {
        create(:access_request, :with_participant_role)
      }

      let(:assessment) {
        access_request.assessment
      }

      let(:user) {
        access_request.user
      }

      let(:assessment_permission) {
        Assessments::Permission.new(assessment)
      }

      it {
        expect(AccessGrantedNotificationWorker).not_to receive(:perform_async)
        assessment_permission.accept_permission_requested(user)
      }
    end

    context 'when the access request is not for a participant' do
      let(:access_request) {
        create(:access_request)
      }

      let(:assessment) {
        access_request.assessment
      }

      let(:user) {
        access_request.user
      }

      let(:assessment_permission) {
        Assessments::Permission.new(assessment)
      }

      it {
        expect(AccessGrantedNotificationWorker).to receive(:perform_async)
        assessment_permission.accept_permission_requested(user)
      }
    end
  end
end
