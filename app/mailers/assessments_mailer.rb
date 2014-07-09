class AssessmentsMailer < ActionMailer::Base
  default from: 'support@pdredesign.org'
  default from_name: 'PDredesign'

  def assigned(assessment, participant, url)
    mandrill_mail template: 'assessment_assigned',
    subject: "Invitation to Assess Professional Development in your District",
    to: {email: participant.user.email, name: participant.user.name},
    vars: {
      'ASSESSMENT_NAME' => assessment.name,
      'ASSESSMENT_URL' => url,
      'ASSESSMENT_DISTRICT' => assessment.district.name,
      'ASSESSMENT_MESSAGE' => assessment.message.html_safe,
      'ASSESSMENT_DUE' => assessment.due_date.in_time_zone("Eastern Time (US & Canada)").strftime("%B %d, %Y"),
      'OWNER_NAME' => assessment.user.name,
      'OWNER_IMAGE' => assessment.user.avatar.url,
      'PARTICIPANT_NAME' => participant.user.first_name
    }
  end

  def reminder(assessment, message, participant)
    @assessment_name      = assessment.name 
    @assessment_url       = assessment_url(assessment.id)
    @assessment_district  = assessment.district.name
    @assessment_due_day   = assessment.due_date.strftime("%A")
    @assessment_due_date  = assessment.due_date.strftime("%e")
    @assessment_due_month = assessment.due_date.strftime("%B")
    @owner_name           = assessment.user.name
    @owner_image          = assessment.user.avatar
    @participant_name     = participant.user.first_name
    @reminder_message     = message.html_safe

    mail(to: participant.user.email)
  end

  private
  def assessment_url(id)
    "#{ENV['BASE_URL']}/#/assessments"
  end
end
