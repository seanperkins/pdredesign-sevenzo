json.id analysis.id
json.name analysis.name
json.created_at analysis.created_at
json.updated_at analysis.updated_at
json.inventory_id analysis.inventory_id
json.deadline analysis.deadline
json.message analysis.message || default_analysis_message
json.is_facilitator analysis.facilitator?(current_user) if current_user
json.participant_count analysis.participants.count
