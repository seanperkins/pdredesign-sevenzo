require 'spec_helper'

describe Invitation::InsertFromInvite do
  describe '#create_or_update_user' do
    context 'when the user account exists' do
      let(:user) {
        create(:user)
      }

      let(:user_invitation) {
        create(:user_invitation, :without_default_user, email: user.email)
      }

      let(:insert_from_invite) {
        Invitation::InsertFromInvite.new(user_invitation)
      }

      before(:each) do
        insert_from_invite.create_or_update_user
        user.reload
      end

      it {
        expect(user.districts.include?(user_invitation.assessment.district)).to be true
      }

      it {
        expect(user.team_role).to eq user_invitation.team_role
      }
    end

    context 'when the user account does not exist' do
      let(:user_args) {
        {
            email: Faker::Internet.safe_email,
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name
        }
      }

      let(:user_invitation) {
        create(:user_invitation, :without_default_user, user_args)
      }

      let(:insert_from_invite) {
        Invitation::InsertFromInvite.new(user_invitation)
      }

      before(:each) do
        insert_from_invite.create_or_update_user
      end

      it {
        user = User.find_by(email: user_args[:email])
        expect(user).to_not be_nil
      }

      it {
        user = User.find_by(first_name: user_args[:first_name])
        expect(user).to_not be_nil
      }

      it {
        user = User.find_by(last_name: user_args[:last_name])
        expect(user).to_not be_nil
      }

      it {
        user = User.includes(:districts).where(districts: {id: user_invitation.assessment.district_id})
        expect(user).to_not be_nil
      }

      it {
        user = User.where(team_role: user_invitation.team_role)
        expect(user).to_not be_nil
      }
    end
  end

  describe '#update_user_id' do
    context 'when the user is not bound to the invitation' do
      let(:user) {
        create(:user, :with_district)
      }

      let(:user_invitation) {
        create(:user_invitation, :without_default_user)
      }

      let(:insert_from_invite) {
        Invitation::InsertFromInvite.new(user_invitation)
      }

      before(:each) do
        insert_from_invite.update_user_id(user)
        user_invitation.reload
      end

      it {
        expect(user_invitation.user).to eq user
      }
    end

    context 'when the user is bound to the invitation' do
      let(:user) {
        user_invitation.user
      }

      let(:user_invitation) {
        create(:user_invitation)
      }

      let(:insert_from_invite) {
        Invitation::InsertFromInvite.new(user_invitation)
      }

      before(:each) do
        insert_from_invite.update_user_id(user)
        user_invitation.reload
      end

      it {
        expect(user_invitation.user).to eq user
      }
    end
  end

  describe '#create_participant' do
    let(:user_invitation) {
      create(:user_invitation, :with_matching_user_email)
    }

    let(:insert_from_invite) {
      Invitation::InsertFromInvite.new(user_invitation)
    }

    before(:each) do
      insert_from_invite.create_participant
    end

    it {
      expect(Participant.find_by(assessment: user_invitation.assessment)).to_not be_nil
    }

    it {
      expect(Participant.find_by(user: user_invitation.user)).to_not be_nil
    }
  end

  describe '#set_permission' do
    context 'if the user is a network partner' do
      let(:user) {
        create(:user, :with_network_partner_role, :with_district)
      }

      let(:user_invitation) {
        create(:user_invitation, user: user, email: user.email)
      }

      let(:assessment_permission) {
        double('Assessments::Permission')
      }

      let(:insert_from_invite) {
        Invitation::InsertFromInvite.new(user_invitation)
      }

      let(:role) {
        'facilitator'
      }

      before(:each) do
        allow(Assessments::Permission).to receive(:new)
                                              .with(user_invitation.assessment)
                                              .and_return(assessment_permission)
      end

      it {
        expect(assessment_permission).to receive(:add_level).with(user, role)
        insert_from_invite.set_permission
      }
    end

    context 'if the user is not a network partner' do
      context 'if the role of the user is not defined' do
        let(:user) {
          create(:user, :without_role, :with_district)
        }

        let(:user_invitation) {
          create(:user_invitation, user: user, email: user.email, role: nil)
        }

        let(:assessment_permission) {
          double('Assessments::Permission')
        }

        let(:insert_from_invite) {
          Invitation::InsertFromInvite.new(user_invitation)
        }

        it {
          expect(Assessments::Permission).not_to receive(:new)
          expect(assessment_permission).not_to receive(:add_level)
          insert_from_invite.set_permission
        }
      end

      context 'if the role of the user is defined' do
        context 'if the role of the invitation is not defined' do
          let(:user) {
            create(:user, :with_district)
          }

          let(:user_invitation) {
            create(:user_invitation, user: user, email: user.email, role: nil)
          }

          let(:assessment_permission) {
            double('Assessments::Permission')
          }

          let(:insert_from_invite) {
            Invitation::InsertFromInvite.new(user_invitation)
          }

          let(:role) {
            user_invitation.role
          }

          it {
            expect(Assessments::Permission).not_to receive(:new)
            insert_from_invite.set_permission
          }
        end

        context 'if the role of the invitation is defined' do
          let(:user) {
            create(:user, :with_district)
          }

          let(:user_invitation) {
            create(:user_invitation, user: user, email: user.email)
          }

          let(:assessment_permission) {
            double('Assessments::Permission')
          }

          let(:insert_from_invite) {
            Invitation::InsertFromInvite.new(user_invitation)
          }

          let(:role) {
            user_invitation.role
          }

          it {
            expect(Assessments::Permission).to receive(:new)
                                                   .with(user_invitation.assessment)
                                                   .and_return(assessment_permission)

            expect(assessment_permission).to receive(:add_level).with(user, role)
            insert_from_invite.set_permission
          }
        end
      end
    end
  end

  describe '#execute' do
    let(:user) {
      create(:user, :with_district)
    }

    let(:user_invitation) {
      create(:user_invitation)
    }


    let(:insert_from_invite) {
      Invitation::InsertFromInvite.new(user_invitation)
    }

    it {
      expect(insert_from_invite).to receive(:create_or_update_user).and_return(user)
      expect(insert_from_invite).to receive(:update_user_id)
      expect(insert_from_invite).to receive(:create_participant)
      expect(insert_from_invite).to receive(:set_permission)

      insert_from_invite.execute
    }
  end
end
