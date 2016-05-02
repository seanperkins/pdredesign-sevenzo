json.array! @questions do |question|
  score = controller.fetch_score(question: question, response: @user_response)

  json.id question.id
  json.category_id question.id
  if score
    json.score do
      json.id score.id
      json.value score.value
      json.evidence score.evidence
      if score.supporting_inventory_response.present?
        json.supporting_inventory_responses do
          json.partial! 'v1/analysis_responses/supporting_inventory_response', supporting_inventory_response: score.supporting_inventory_response
        end
      end
    end
  end
end
