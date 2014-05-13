module Assessments
  module Report
    module OverviewText
      include ActionView::Helpers::TextHelper

      def overview
        if assessment.has_response?
          if assessment.response_submitted?
            { text: 'Overview based on consensus response.',
              link: :view_consensus}
          else
            { text: 'Overview based on consensus response.',
              link: :edit_consensus}
          end
        else
          if assessment.participant_responses.count == 0
            { text: 'Overview not yet determined.',
              link: :none }
          else
            { text: "Overview based on #{pluralize(assessment.participant_responses.count, 'individual response')}",
              link: :create_consensus}
          end
        end
      end

    end
  end
end
