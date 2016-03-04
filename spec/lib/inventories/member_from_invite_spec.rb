require 'spec_helper'

describe Inventories::MemberFromInvite do
  describe '#execute' do
    context 'inviting existing network partner as participant' do
      let(:inventory) { FactoryGirl.create(:inventory) }
      let(:existing_user) { FactoryGirl.create(:user, :with_network_partner_role) }
      let(:invitation) { FactoryGirl.create(:inventory_invitation, :as_participant, inventory_id: inventory.id ,email: existing_user.email) }

      before(:each) do
         Inventories::MemberFromInvite.new(invitation).execute
         existing_user.reload
      end

      it 'overrides the role to be facilitator' do
        expect(inventory.facilitator?(user: existing_user)).to be true
      end

      it 'sets user district' do
        expect(existing_user.district_ids).to include inventory.district_id
      end

      it 'sets user team_role' do
        expect(existing_user.team_role).to eq invitation.team_role
      end
    end

    context 'inviting non network partner as participant' do
      let(:inventory) { FactoryGirl.create(:inventory) }
      let(:existing_user) { FactoryGirl.create(:user, :without_role) }
      let(:invitation) { FactoryGirl.create(:inventory_invitation, :as_participant, inventory: inventory, email: existing_user.email) }

      before(:each) do
        Inventories::MemberFromInvite.new(invitation).execute
      end

      it do
        expect(inventory.participant?(user: existing_user)).to be true
      end
    end

    context 'inviting non-existent user ignoring email case' do
      let(:inventory) { FactoryGirl.create(:inventory) }
      let(:invitation) { FactoryGirl.create(:inventory_invitation, :as_participant, inventory: inventory, email: 'John_Doe@example.com') }
      let(:user) { User.find_by(email: 'john_doe@example.com') }

      before(:each) do
         Inventories::MemberFromInvite.new(invitation).execute
      end

      it 'creates user' do
        expect(user).to_not be_nil
      end

      it 'sets user district' do
        expect(user.district_ids).to include inventory.district_id
      end

      it 'sets user team_role' do
        expect(user.team_role).to eq invitation.team_role
      end
    end
  end

=begin
  it 'does not create multiple district entries for existing user' do
    @user.update(district_ids: [@district2.id])

    subject.new(existing_user_invite).execute

    user = User.find_by(email: @user.email)
    expect(user.district_ids.count).to eq(1)
  end

  it 'updates the user_id after a user has been created' do
    subject.new(existing_user_invite).execute

    user = User.find_by(email: @user.email)
    expect(UserInvitation.find_by(user_id: user.id)).not_to be_nil
  end 

  it 'can safely create two invites' do
    subject.new(create_valid_invite).execute
    user = User.find_by(email: 'john_doe@gmail.com')

    Participant.find_by(user_id: user.id).delete
  end

  it 'creates a participant for an invite' do
    subject.new(create_valid_invite).execute
    user = User.find_by(email: 'john_doe@gmail.com')

    expect(Participant.find_by(user_id: user.id)).not_to be_nil
  end

  it 'creates a participant and set the specified role' do
    subject.new(create_valid_invite).execute
    expect(
      assessment.facilitator?(User.find_by(email: 'john_doe@gmail.com'))
    ).to eq(true)
  end
=end
end
