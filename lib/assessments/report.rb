module Assessments
  class Report 
    attr_reader :assessment

    def initialize(assessment)
      @assessment = assessment
    end

    def axes
      axes = response
        .questions
        .joins(:axis)
        .pluck(:axis_id)
        .uniq
      Axis.where(id: axes)
    end

    def response
      assessment.response || Response.new
    end

    def axis_questions(axis)
      response
        .questions
        .joins(:category)
        .where(categories: {axis_id: axis.id})
    end

    def average(axis)
      ids = assessment.participant_responses.pluck(:id)
      Score
        .joins(question: { category:  :axis })
        .where(response_id: ids)
        .where.not(value: nil)
        .where("categories.axis_id = ? ", axis.id)
        .average(:value)
    end

  end
end
