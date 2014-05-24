json.id @response.id

number = 0
json.categories @categories do |category|
  json.id      category.id
  json.name    category.name
  json.axis_id category.axis_id

  json.questions category.rubric_questions(@rubric) do |question| 
    json.number      number += 1
    json.id          question.id
    json.order       question.order
    json.content     question.content
    json.headline    question.headline
    json.category_id question.category_id
    json.score controller.score_for(@response, question)
    json.answers question.answers
  end
end
