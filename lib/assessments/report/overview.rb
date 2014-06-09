module Assessments
  module Report
    class Overview
      include OverviewText

      attr_reader :assessment
      def initialize(assessment)
        @assessment = assessment
      end

      def average_scores
        categories
          .average(:value)
      end
    
      def categories_by_average
        categories
          .group("categories.id")
          .average(:value)
          .map do |category|
            new_category = {}
            new_category[:name]    = category[0][0]
            new_category[:id]      = category[0][1]
            new_category[:average] = category[1] || 0
            new_category
        end
      end

      private
      def categories
        Score
          .joins(question: :category)
          .where(response_id: response_ids)
          .group("categories.name")
          .order("average_value DESC")
      end

      def response_ids
        return assessment.response.id if assessment.has_response? && assessment.response_submitted?
        assessment.participant_responses.pluck(:id)
      end
    end
  end
end
 
