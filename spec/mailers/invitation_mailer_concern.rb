shared_examples_for 'an invitation mailer' do
  context 'when the email is HTML-based' do
    it "includes the user's first name" do
      expect(result.html_part.body.encoded).to match invitation.user.first_name
    end

    it "includes the facilitator's name" do
      expect(result.html_part.body.encoded).to match tool.user.first_name
    end

    it "includes the tool's name" do
      expect(result.html_part.body.encoded).to match tool.name
    end

    it 'includes the district name' do
      expect(result.html_part.body.encoded).to match tool.district.name
    end

    it 'includes the message' do
      expect(result.html_part.body.encoded).to match tool.message.html_safe
    end

    it 'includes the due date' do
      expect(result.html_part.body.encoded).to match tool.due_date.strftime('%B %d, %Y')
    end

    it 'includes the tool link' do
      expect(result.html_part.body.encoded).to match tool_link
    end
  end
  
  context 'when the email is text-based' do
    it "includes the user's first name" do
      expect(result.text_part.body.encoded).to match invitation.user.first_name
    end

    it "includes the facilitator's name" do
      expect(result.text_part.body.encoded).to match tool.user.first_name
    end

    it "includes the tool's name" do
      expect(result.text_part.body.encoded).to match tool.name
    end

    it 'includes the district name' do
      expect(result.text_part.body.encoded).to match tool.district.name
    end

    it 'includes the message' do
      expect(result.text_part.body.encoded).to match tool.message.html_safe
    end

    it 'includes the due date' do
      expect(result.text_part.body.encoded).to match tool.due_date.strftime('%B %d, %Y')
    end

    it 'includes the tool link' do
      expect(result.text_part.body.encoded).to match tool_link
    end
  end
end