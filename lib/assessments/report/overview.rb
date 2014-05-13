module Assessments
  module Report
    class Overview
      include OverviewText

      attr_reader :assessment
      def initialize(assessment)
        @assessment = assessment
      end

      def strengths
        average_scores.keys
      end

      def limitations 
        average_scores.keys.reverse
      end

      def average_scores
        Score
          .joins(question: :category)
          .where(response_id: response_ids)
          .where.not(value: nil)
          .group("categories.name")
          .order("average_value DESC")
          .average(:value)
      end

      private
      def response_ids
        return assessment.response.id if assessment.has_response? && assessment.response_submitted?
        assessment.participant_responses.pluck(:id)
      end
    end
  end
end
 
