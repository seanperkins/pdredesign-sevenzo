class ResponseMailer < MandrillMailer::TemplateMailer
  default from: 'support@pdredesign.org'
  default from_name: 'PD Redesign'

  def submitted(response, assessment)
    mandrill_mail template: 'response_submitted',
    subject: "Readiness Assessment completed by #{response.responder.user.name}",
    to: {email: assessment.user.email, name: assessment.user.name},
    vars: {
      'PARTICIPANT_NAME' => response.responder.user.name,
      'ASSESSMENT_NAME' => assessment.name,
      'ASSESSMENT_DISTRICT' => assessment.district.name,
      'ASSESSMENT_URL' => assessment_url(assessment),
      'ASSESSMENT_COMPLETION_PERCENT' => "#{assessment.percent_completed}%",
      'ASSESSMENT_COMPLETED_COUNT' => assessment.participant_responses.count,
      'ASSESSMENT_PARTICIPANT_COUNT' => assessment.participants.count,
      'ASSESSMENT_DUE' => assessment.due_date.in_time_zone("Eastern Time (US & Canada)").strftime("%B %d, %Y"),
      'FACILITATOR_NAME' => assessment.user.name
    }
  end

end