require 'spec_helper' 

describe ResponsesMailer do
  before { create_magic_assessments }
  before { create_responses }

  context '#submitted' do

    let(:mail) do
      response = Response.find_by(responder_id: @participant.id)
      ResponsesMailer.submitted(response)
    end

    it 'sends the invite mail to the user on invite' do
      response = Response.find_by(responder_id: @participant.id)
      response.responder.assessment.user.update(email: 'some@user.com')
      
      expect(mail.to).to include('some@user.com')
    end

  end
end
