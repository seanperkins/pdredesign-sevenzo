index = 0
json.array! @scores_and_relevant_data do |score|
  index +=1
  json.question_id score.question_id
  json.priority index
  json.category score.headline
  json.score score.value
  json.products score.product_count
  json.data score.data_count
  json.total_yearly_cost_in_cents score.total_cost_yearly
end