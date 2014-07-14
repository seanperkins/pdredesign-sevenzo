json.array! @questions do |question|
  score = Score.find_by(question: question, response: @user_response) 

  json.id          question.id
  json.category_id question.id
  json.score do 
    json.id    score.id
    json.value score.value
    json.evidence score.evidence
  end if score
end
