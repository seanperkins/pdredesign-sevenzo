# == Schema Information
#
# Table name: tool_members
#
#  tool_type   :string
#  tool_id     :integer
#  role        :integer
#  user_id     :integer          not null
#  invited_at  :datetime
#  reminded_at :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'spec_helper'

describe ToolMember do
  it {
    is_expected.to belong_to :user
  }

  it {
    is_expected.to belong_to :tool
  }

  it {
    is_expected.to validate_inclusion_of(:role).in_array(ToolMember.member_roles.values)
  }

  context 'when a user is a member of a tool' do
    context 'when the user is a facilitator' do
      let(:user) {
        create(:user)
      }

      let(:tool_member) {
        create(:tool_member, :as_inventory_member, :as_facilitator, user: user)
      }

      let(:new_tool_member) {
        build(:tool_member, :as_inventory_member, :as_participant, user: user)
      }

      it 'allows the user to be added as a participant' do
        expect{new_tool_member.save!}.to_not raise_error
      end
    end

    context 'when the user is a facilitator' do
      let(:user) {
        create(:user)
      }

      let(:tool_member) {
        create(:tool_member, :as_inventory_member, :as_facilitator, user: user)
      }

      let(:new_tool_member) {
        build(:tool_member, :as_inventory_member, :as_participant, user: user)
      }

      it 'allows the user to be added as a participant' do
        expect{new_tool_member.save!}.to_not raise_error
      end
    end

    context 'when the user is both a facilitator and participant' do
      let(:user) {
        create(:user)
      }

      let(:inventory) {
        create(:inventory)
      }

      let!(:membership) {
        create(:tool_member, :as_facilitator, user: user, tool: inventory)
        create(:tool_member, :as_participant, user: user, tool: inventory)
      }

      let(:new_participant_tool_member) {
        build(:tool_member, :as_participant, user: user, tool: inventory)
      }

      let(:new_facilitator_participant_member) {
        build(:tool_member, :as_facilitator, user: user, tool: inventory)
      }

      it 'does not allow the user to become a participant again' do
        expect{new_participant_tool_member.save!}
            .to raise_error(ActiveRecord::RecordInvalid, /Role has already been taken/)
      end

      it 'does not allow the user to become a facilitator again' do
        expect{new_facilitator_participant_member.save!}
            .to raise_error(ActiveRecord::RecordInvalid, /Role has already been taken/)
      end
    end
  end
end
