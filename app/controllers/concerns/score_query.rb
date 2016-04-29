module ScoreQuery
  extend ActiveSupport::Concern

  def create_empty_scores(response)
    response.questions.each do |question|
      next if score_for(response, question).present?
      options = {question: question}
      if response.responder_type == Analysis.to_s
        options.merge!(supporting_inventory_response: SupportingInventoryResponse.create!)
      end
      response.scores.create!(options)
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
