module Assessments
  class Report 
    attr_reader :assessment

    def initialize(assessment)
      @assessment = assessment
    end

    def axes
      Axis.where(id: axes_ids)
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
      Score
        .joins(question: { category:  :axis })
        .where(response_id: response_id)
        .where.not(value: nil)
        .where("categories.axis_id = ? ", axis.id)
        .average(:value)
    end

    private
    def response_id
      assessment.response.id
    end

    def axes_ids
      response
        .questions
        .joins(:axis)
        .pluck(:axis_id)
        .uniq
    end
  end
end
