json.array! @assessments do |assessment|
  json.id                assessment.id
  json.name              assessment.name
  json.due_date          assessment.due_date
  json.meeting_date      assessment.meeting_date
  json.district_id       assessment.district_id
  json.updated_at        assessment.updated_at
  json.created_at        assessment.created_at
  json.status            assessment.status

  json.participant_count   assessment.participants.count
  json.percent_completed   assessment.percent_completed
  json.completed_responses assessment.participant_responses.count

  json.facilitator do
    json.role       assessment.user.role
    json.team_role  assessment.user.team_role
    json.first_name assessment.user.first_name
    json.last_name  assessment.user.last_name
    json.avatar     image_url(assessment.user.avatar)
  end

  json.participants assessment.participants do |participant|
    json.role       participant.user.role
    json.team_role  participant.user.team_role
    json.first_name participant.user.first_name
    json.last_name  participant.user.last_name
    json.avatar     image_url(participant.user.avatar)
  end

end

