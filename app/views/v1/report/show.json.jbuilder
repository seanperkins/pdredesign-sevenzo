json.axes @axes do |axis|
  json.id         axis.id
  json.name       axis.name
  json.questions  controller.axis_questions(@response, axis) do |question|
    json.id       question.id
    json.headline question.headline
    json.score    controller.score_for(@response, question)
    json.answers  question.answers, :id, :value
  end
  json.average    (controller.average(@assessment, axis) || 0.0).ceil
end
