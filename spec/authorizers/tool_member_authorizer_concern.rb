shared_examples_for 'an authorizer for a tool' do |tool_sym|
  let(:tool) {
    create(tool_sym)
  }

  let(:facilitator_tool_member) {
    create(:tool_member, :as_facilitator, tool: tool)
  }

  let(:participant_tool_member) {
    create(:tool_member, :as_participant, tool: tool)
  }

  let(:non_member_user) {
    create(:user)
  }

  describe '#creatable_by' do
    subject {
      facilitator_tool_member.authorizer
    }

    context 'when the member is not a member of the tool' do
      it {
        is_expected.not_to be_creatable_by(non_member_user)
      }
    end

    context 'when the user is a facilitator of the tool' do
      it {
        is_expected.to be_creatable_by(facilitator_tool_member.user)
      }
    end

    context 'when the user is a participant of the tool' do
      it {
        is_expected.not_to be_creatable_by(participant_tool_member.user)
      }
    end
  end

  describe '#readable_by?' do
    subject {
      facilitator_tool_member.authorizer
    }

    context 'when the member is not a member of the tool' do
      it {
        is_expected.not_to be_readable_by(non_member_user)
      }
    end

    context 'when the user is a facilitator of the tool' do
      it {
        is_expected.to be_readable_by(facilitator_tool_member.user)
      }
    end

    context 'when the user is a participant of the tool' do
      it {
        is_expected.to be_readable_by(participant_tool_member.user)
      }
    end
  end

  describe '#updatable_by?' do
    subject {
      facilitator_tool_member.authorizer
    }

    context 'when the member is not a member of the tool' do
      it {
        is_expected.not_to be_updatable_by(non_member_user)
      }
    end

    context 'when the user is a facilitator of the tool' do
      it {
        is_expected.to be_updatable_by(facilitator_tool_member.user)
      }
    end

    context 'when the user is a participant of the tool' do
      it {
        is_expected.not_to be_updatable_by(participant_tool_member.user)
      }
    end
  end

  describe '#deletable_by?' do
    subject {
      facilitator_tool_member.authorizer
    }

    context 'when the member is not a member of the tool' do
      it {
        is_expected.not_to be_deletable_by(non_member_user)
      }
    end

    context 'when the user is a facilitator of the tool' do
      it {
        is_expected.to be_deletable_by(facilitator_tool_member.user)
      }
    end

    context 'when the user is a participant of the tool' do
      it {
        is_expected.not_to be_deletable_by(participant_tool_member.user)
      }
    end
  end
end