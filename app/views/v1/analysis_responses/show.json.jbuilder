json.id @response.id
json.submitted_at @response.submitted_at
json.is_completed @response.submitted_at.present?

json.categories @categories do |category|
  json.id category.id
  json.name category.name
  json.axis_id category.axis_id

  json.questions category.rubric_questions(@rubric) do |question|
    json.id question.id
    json.order question.order
    json.content question.content
    json.headline question.headline
    json.category_id question.category_id
    json.score controller.score_for(@response, question)
    json.answers question.ordered_answers
  end
end