json.id score.id
json.value score.value
json.evidence score.evidence
json.supporting_inventory_response do
  json.partial! 'v1/analysis_responses/supporting_inventory_response',
                supporting_inventory_response: score.supporting_inventory_response
end
json.response_id score.response_id
json.question_id score.question_id
json.created_at score.created_at
json.updated_at score.updated_at