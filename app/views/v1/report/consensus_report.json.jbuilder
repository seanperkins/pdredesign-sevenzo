json.id             @response.id
json.is_completed   @response.submitted_at && true
json.assessment_id  @assessment.id

json.participants @assessment.participants do |participant|
  json.id           participant.id
  json.name         participant.user.name
end

json.partial!     'v1/consensus/consensus'

number    = 0
consensus_questions = []
@categories.each do |category|
  category.rubric_questions(@rubric).each do |question|
    consensus_questions << question
  end
end

json.questions consensus_questions do |question|
  json.number      number += 1
  json.id          question.id
  json.order       question.order
  json.content     question.content
  json.headline    question.headline
  json.category_id question.category_id
  json.score       controller.score_for(@response, question)
  json.answers     question.ordered_answers
end