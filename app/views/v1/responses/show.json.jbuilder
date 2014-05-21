json.id @response.id

json.categories @categories do |category|
  json.id      category.id
  json.name    category.name
  json.axis_id category.axis_id

  json.questions category.questions do |question| 
    json.id question.id
    json.order       question.order
    json.content     question.content
    json.headline    question.headline
    json.category_id question.category_id
    json.score controller.score_for(@response, question)
  end
end
