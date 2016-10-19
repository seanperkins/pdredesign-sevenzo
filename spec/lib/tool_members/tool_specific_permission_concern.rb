shared_examples_for 'permissions for a specific tool' do |tool_sym, notification_worker|
  let(:tool) {
    create(tool_sym, :with_participants, :with_facilitators, participants: 2, facilitators: 2)
  }

  describe '#roles' do
    context 'when the user is a participant' do
      let(:participant_user) {
        tool.participants.sample.user
      }

      let(:permission) {
        ToolMembers::Permission.new(tool, participant_user)
      }

      it {
        expect(permission.roles).to eq ['participant']
      }
    end

    context 'when the user is a facilitator' do
      let(:facilitator_user) {
        tool.facilitators.first.user
      }

      let(:permission) {
        ToolMembers::Permission.new(tool, facilitator_user)
      }

      it {
        expect(permission.roles).to eq ['facilitator']
      }
    end

    context 'when the user is both a facilitator and participant' do
      let(:dual_user) {
        tool_member = create(:tool_member, :as_facilitator_and_participant, tool: tool)
        tool_member.user
      }

      let(:permission) {
        ToolMembers::Permission.new(tool, dual_user)
      }

      it {
        expect(permission.roles.include?('participant')).to be true
      }

      it {
        expect(permission.roles.include?('facilitator')).to be true
      }
    end
  end


  describe '#set_and_notify_role' do
    context 'when the user is a new user' do
      let(:user) {
        create(:user)
      }

      context 'when the role being set is facilitator' do
        let(:permission) {
          ToolMembers::Permission.new(tool, user)
        }

        before(:each) do
          permission.set_and_notify_role('facilitator')
        end

        it {
          expect(permission.roles).to eq ['facilitator']
        }
      end

      context 'when the role being set is participant' do
        let(:permission) {
          ToolMembers::Permission.new(tool, user)
        }

        before(:each) do
          permission.set_and_notify_role('participant')
        end

        it {
          expect(permission.roles).to eq ['participant']
        }
      end
    end

    context 'when the user is an existing participant' do
      let(:existing_user) {
        tool.participants.sample.user
      }

      context 'when their permission is increased to facilitator' do
        let(:permission) {
          ToolMembers::Permission.new(tool, existing_user)
        }

        before(:each) do
          allow(notification_worker).to receive(:perform_async)
          permission.set_and_notify_role('facilitator')
        end

        it {
          expect(permission.roles).to eq ['facilitator']
        }

        it {
          expect(notification_worker).to have_received(:perform_async).with(tool.id, existing_user.id, 'facilitator')
        }
      end
    end
  end
end