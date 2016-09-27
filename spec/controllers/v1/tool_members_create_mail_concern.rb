shared_examples_for 'a created tool member with a specific tool' do |tool_sym|
  let(:user) {
    create(:user)
  }

  let(:candidate) {
    create(:user)
  }

  let(:tool) {
    create(tool_sym)
  }

  let!(:tool_member) {
    create(:tool_member, :as_facilitator, tool: tool, user: user)
  }

  let(:notification_worker) {
    case tool_sym
      when :assessment
        AccessGrantedNotificationWorker
      when :inventory
        InventoryAccessGrantedNotificationWorker
      when :analysis
        AnalysisAccessGrantedNotificationWorker
      else
        nil
    end
  }

  context 'when the entity to be created is valid (uppercase tool type)' do
    before(:each) do
      sign_in user
      post :create, tool_member: {tool_type: tool.class.to_s.upcase,
                                  tool_id: tool.id,
                                  role: ToolMember.member_roles[:participant],
                                  user_id: candidate.id}
    end

    it {
      is_expected.to respond_with(:created)
    }

    it {
      expect(ToolMember.where(tool: tool, user: candidate).size).to eq 1
    }

    it {
      expect(notification_worker.jobs.size).to eq 1
    }

    it {
      expect(notification_worker.jobs.first['args'][0]).to eq [tool.id, candidate.id, 'participant']
    }
  end

  context 'when the entity to be created is valid (lowercase tool type)' do
    before(:each) do
      sign_in user
      post :create, tool_member: {tool_type: tool.class.to_s.downcase,
                                  tool_id: tool.id,
                                  role: ToolMember.member_roles[:participant],
                                  user_id: candidate.id}
    end

    it {
      is_expected.to respond_with(:created)
    }

    it {
      expect(ToolMember.where(tool: tool, user: candidate).size).to eq 1
    }

    it {
      expect(notification_worker.jobs.size).to eq 1
    }

    it {
      expect(notification_worker.jobs.first['args'][0]).to eq [tool.id, candidate.id, 'participant']
    }
  end

  context 'when the entity to be created already exists' do
    let!(:preexisting_candidate_membership) {
      create(:tool_member, :as_participant, tool: tool, user: candidate)
    }

    before(:each) do
      sign_in user
      post :create, tool_member: {tool_type: tool.class.to_s,
                                  tool_id: tool.id,
                                  role: ToolMember.member_roles[:participant],
                                  user_id: candidate.id}
    end

    it {
      is_expected.to respond_with :bad_request
    }

    it {
      expect(json['errors']['role'][0]).to eq 'has already been taken'
    }
  end
end