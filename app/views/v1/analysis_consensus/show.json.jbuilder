json.id @response.id
json.submitted_at @response.submitted_at
json.is_completed @response.submitted_at.present?

number = 0
json.categories @categories do |category|
  json.id category.id
  json.name category.name
  json.axis_id category.axis_id

  json.questions category.rubric_questions(@rubric) do |question|
    json.number number += 1
    json.id question.id
    json.order question.order
    json.content question.content
    json.headline question.headline
    json.category_id question.category_id
    json.score do
      json.partial! 'v1/analysis_responses/score', score: controller.score_for(@response, question)
    end
    json.answers question.ordered_answers
  end
end