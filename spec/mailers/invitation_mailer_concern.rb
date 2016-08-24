shared_examples_for 'an invitation mailer' do
  it "includes the user's first name" do
    expect(result.body.encoded).to match invitation.user.first_name
  end

  it "includes the facilitator's name" do
    expect(result.body.encoded).to match tool.user.first_name
  end

  it "includes the tool's name" do
    expect(result.body.encoded).to match tool.name
  end

  it 'includes the district name' do
    expect(result.body.encoded).to match tool.district.name
  end

  it 'includes the message' do
    expect(result.body.encoded).to match tool.message.html_safe
  end

  it 'includes the due date' do
    expect(result.body.encoded).to match tool.due_date.strftime('%B %d, %Y')
  end
end