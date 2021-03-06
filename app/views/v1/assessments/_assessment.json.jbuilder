json.id                assessment.id
json.name              assessment.name
json.due_date          assessment.due_date
json.meeting_date      assessment.meeting_date
json.district_id       assessment.district_id
json.district_name     assessment.district.name
json.updated_at        assessment.updated_at
json.created_at        assessment.created_at
json.status            assessment.status
json.rubric_id         assessment.rubric_id
json.report_takeaway   assessment.report_takeaway
json.message           assessment.message || default_assessment_message
json.owner             (assessment.user.id == current_user.id)
json.share_token       assessment.share_token

if assessment.consensus
  json.consensus do
    json.id           assessment.consensus.id
    json.submitted_at assessment.consensus.submitted_at
    json.is_completed assessment.fully_complete?
  end
end

json.participant_count   assessment.participants.count
json.percent_completed   assessment.percent_completed
json.completed_responses assessment.participant_responses.count

json.is_participant assessment.participant?(current_user)
json.is_facilitator assessment.facilitator?(current_user)
json.has_access assessment.has_access?(current_user)

json.responses assessment.responses(current_user) do |response|
  json.id response.id
end

json.participants assessment.participants do |participant|
  json.partial! 'v1/shared/participant', participant: participant
end

json.facilitator do
  json.partial! 'v1/shared/user', user: assessment.user
end


