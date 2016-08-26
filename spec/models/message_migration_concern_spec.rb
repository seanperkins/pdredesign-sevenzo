shared_examples_for 'a tool which adds initial messages' do |tool_str|
  context 'when saving once' do
    let(:tool) {
      build(tool_str.to_sym, message: '<p>Default message!  One with a bit of <b>bold</b> as well.</p>')
    }

    before(:each) do
      tool.save!
    end

    it 'adds the message to the messages table' do
      expect(Message.where(tool: tool)).not_to be_empty
    end

    it 'does not include any HTML tags' do
      expect(Message.where(tool: tool).first.content).to eq 'Default message!  One with a bit of bold as well.'
    end
  end

  context 'when saving multiple times' do
    let(:tool) {
      build(tool_str.to_sym, message: '<p>Default message!</p>')
    }

    before(:each) do
      tool.save!
      tool.save!
    end

    it 'does not add multiple messages' do
      expect(Message.where(tool: tool).size).to eq 1
    end
  end
end