class AssessmentMailer < MandrillMailer::TemplateMailer
  default from: 'support@pdredesign.org'
  default from_name: 'PD Redesign'

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

  def reminder(assessment, participant, url, message)
    mandrill_mail template: 'assessment_reminder',
    subject: "Reminder: You have an assessment due soon...",
    to: {email: participant.user.email, name: participant.user.name},
    vars: {
      'ASSESSMENT_NAME' => assessment.name,
      'ASSESSMENT_URL' => url,
      'ASSESSMENT_DISTRICT' => assessment.district.name,
      'ASSESSMENT_DUE_DAY' => assessment.due_date.strftime("%A"),
      'ASSESSMENT_DUE_DATE' => assessment.due_date.strftime("%e"),
      'ASSESSMENT_DUE_MONTH' => assessment.due_date.strftime("%B"),
      'OWNER_NAME' => assessment.user.name,
      'OWNER_IMAGE' => assessment.user.avatar.url,
      'PARTICIPANT_NAME' => participant.user.first_name,
      'REMINDER_MESSAGE' => message.content.html_safe
    }
  end
end