json.id analysis.id
json.name analysis.name
json.created_at analysis.created_at
json.updated_at analysis.updated_at
json.inventory_id analysis.inventory_id
json.deadline analysis.deadline
json.message analysis.message || default_analysis_message if current_user
json.is_facilitator analysis.facilitator?(current_user) if current_user
json.participant_count analysis.participants.count
json.messages @messages, :id, :category, :teaser, :sent_at do |message|
  json.id       message.id
  json.category message.category
  json.teaser   sanitize(message.teaser, tags: [])
  json.sent_at  message.sent_at
end
json.facilitator do
  json.partial! 'v1/shared/user', user: analysis.owner
end
