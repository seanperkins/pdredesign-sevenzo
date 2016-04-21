class AnalysisAccessGrantedMailer < ApplicationMailer
  def notify(inventory, user, role)
    subject = "Your access was granted"
    @participant_name = user.name
    @analysis_name  = analysis.name
    @participant_role = role
    mail(subject: subject, to: user.email)
  end
end
