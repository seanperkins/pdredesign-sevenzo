require 'spec_helper'

describe InventoryInvitationNotificationWorker do
  describe '#perform' do
    let(:inventory) { FactoryGirl.create(:inventory, :with_members) }
    let(:member) { inventory.members.first }
    let(:user) { member.user }
    let(:invitation) { FactoryGirl.create(:inventory_invitation, inventory: inventory, user: user) }
    let(:mailer) { double('mailer') }

    before(:each) do
      expect(InventoryInvitationMailer).to receive(:invite)
        .with(invitation)
        .and_return(mailer)
      expect(mailer).to receive(:deliver_now)
      InventoryInvitationNotificationWorker.new.perform(invitation.id)
      member.reload
    end

    it 'updates invited_at' do
      expect(member.updated_at).not_to be_nil
    end
  end

=begin
  it 'sets the participant :invited_at' do
    double = double("mailer").as_null_object

    allow(NotificationsMailer).to receive(:invite).and_return(double)
    @participant.update(invited_at: nil) 

    subject.new.perform(@invitation.id)

    @participant.reload
    expect(@participant.invited_at).not_to be_nil
  end
=end
end
