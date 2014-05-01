module Assessments
  class Subheading
    
    attr_reader :assessment, :role

    def initialize(assessment, role)
      @assessment = assessment
      @role       = role
    end

    def subheading
      text, _ = text_and_participants
      text
    end

    def participants
      _, participants = text_and_participants
      participants
    end

    def text_and_participants
      if assessment.response.present? 
        submitted_response_subheading
      else
        unsubmitted_response_subheading
      end
    end

    private
    def unsubmitted_response_subheading
      if assessment.participant_responses.count < assessment.participants.count
        return messages[role][:not_yet_submitted], assessment.participants_not_responded
      else
        return messages[role][:completed], []
      end
    end

    def submitted_response_subheading
      if assessment.response.submitted_at.present?
        return messages[role][:viewed_report], assessment.participants_viewed_report
      else
        return messages[role][:please_complete], []
      end
    end

    def messages
      {
        facilitator: {
          not_yet_submitted: 'Not yet submitted:',
          completed: "All participants have completed their responses to this assessment. Please proceed to consensus.",
          viewed_report: "Viewed Report:", 
          please_complete: "Please complete and submit the consensus response to view the report."
        },
        member: {
          not_yet_submitted: 'Not yet submitted:',
          completed: "The consensus response is currently being completed by the assessment's facilitator.",
          viewed_report: "Viewed Report:", 
          please_complete: "All participants have completed their responses to this assessment."
        }
      }
    end

  end
end
