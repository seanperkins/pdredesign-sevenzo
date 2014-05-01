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

  json.subheading do
    json.text @subheading
    json.participants @subheading_participants do |participant|
      json.partial! 'v1/shared/user', user: participant.user
    end
  end

  json.subheading do
    subheading = Assessments::Subheading.new(assessment, @role)
    text, participants = subheading.text_and_participants
    json.text text
    json.participants participants do |participant|
      json.partial! 'v1/shared/user', user: participant.user
    end
  end

  json.facilitator do
    json.partial! 'v1/shared/user', user: assessment.user
  end

  json.participants assessment.participants do |participant|
    json.partial! 'v1/shared/user', user: participant.user
  end

end
