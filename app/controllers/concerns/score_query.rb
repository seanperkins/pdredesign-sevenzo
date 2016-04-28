module ScoreQuery
  extend ActiveSupport::Concern

  def create_empty_scores(response)
    response.questions.each do |question|
      next if score_for(response, question).present?
      response.scores.create!(question: question)
    end
  end

  def score_for(response, question)
    scores(response)
      .find_by(question: question)
  end

  private
  def scores(response)
    @scores ||= Score.where(response: response)
  end
end
