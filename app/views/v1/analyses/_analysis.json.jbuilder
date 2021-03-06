json.id analysis.id
json.name analysis.name
json.owner_id analysis.owner_id
json.facilitator do
  json.partial! 'v1/shared/user', user: analysis.owner
end
json.is_facilitator analysis.facilitator?(current_user)
json.due_date analysis.deadline
json.district_id analysis.inventory.district.id
json.district_name analysis.inventory.district.name
json.created_at analysis.created_at
json.updated_at analysis.updated_at
json.assigned_at analysis.assigned_at

json.status analysis.status
json.has_access analysis.member?(current_user) || analysis.owner == current_user if current_user
json.inventory_id analysis.inventory_id
json.message analysis.message || default_analysis_message if current_user
json.is_facilitator analysis.facilitator?(current_user)
json.participant_count analysis.participants.size
json.report_takeaway analysis.report_takeaway
json.share_token analysis.share_token

if analysis.consensus
  json.consensus do
    json.id           analysis.consensus.id
    json.submitted_at analysis.consensus.submitted_at
    json.is_completed analysis.fully_complete?
  end
end
