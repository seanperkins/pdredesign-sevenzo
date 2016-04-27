class AnalysisMailer < ApplicationMailer
  def assigned(analysis, participant)
    @first_name = participant.user.first_name
    @facilitator = analysis.inventory.owner
    @analysis_name = analysis.name
    @district_name = analysis.inventory.district.name
    @analysis_link = analysis_url(analysis.inventory.id)
    @deadline = analysis.deadline.strftime("%B %d, %Y")
    @message = analysis.message.try(:html_safe)

    subject = 'Invited to Contribute to Analysis'
    mail(subject: subject, to: participant.user.email) do |format|
      format.html { render 'analysis_invitation_mailer/invite' }
      format.text { render 'analysis_invitation_mailer/invite' }
    end
  end
end
