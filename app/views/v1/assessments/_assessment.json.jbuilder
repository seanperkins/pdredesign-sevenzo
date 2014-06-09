json.id                assessment.id
json.name              assessment.name
json.due_date          assessment.due_date
json.meeting_date      assessment.meeting_date
json.district_id       assessment.district_id
json.updated_at        assessment.updated_at
json.created_at        assessment.created_at
json.status            assessment.status
json.rubric_id         assessment.rubric_id
json.message           assessment.message
json.owner             (assessment.user == current_user)

json.consensus do
  json.id           assessment.consensus.id
  json.submitted_at assessment.consensus.submitted_at
end if assessment.consensus


json.participant_count   assessment.participants.count
json.percent_completed   assessment.percent_completed
json.completed_responses assessment.participant_responses.count

json.partial! 'overview', overview: @overview if @overview

json.messages @messages, :id, :category, :teaser, :sent_at do |message|
  json.id       message.id 
  json.category message.category
  json.teaser   sanitize(message.teaser, tags: [])
  json.sent_at  message.sent_at
end

json.responses assessment.responses(current_user) do |response|
  json.id response.id
end

json.participants assessment.participants do |participant|
  json.partial! 'v1/shared/participant', participant: participant
end

json.facilitator do
  json.partial! 'v1/shared/user', user: assessment.user
end


