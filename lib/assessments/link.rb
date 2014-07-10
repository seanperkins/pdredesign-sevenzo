module Assessments
  class Link

    attr_reader :assessment, :user

    def initialize(assessment, user)
      @assessment = assessment
      @user       = user
    end       

    def links
      return facilitator_links if facilitator?
      member_links 
    end

    def assessment_link
      return :none      unless assessment.assigned?
      return :consensus if fully_complete? 
      return :response  if user_has_responses? 
      return :new_response if assessment.participant?(user)
      :none
    end

    private
    def facilitator_links
      { dashboard: dashboard_link,
        consensus: consensus_link,
        report:    report_link,
      }
    end

    def member_links
      { messages:  message_link,
        consensus: consensus_link,
        report:    report_link,
      }
    end

    def member_consensus_link 
      if fully_complete?
        return { title: "Consensus", active: true, type: :show_response }
      end

      return { title: "Consensus", active: false, type: :none }
    end

    def consensus_link
      return member_consensus_link unless facilitator?

      if assessment.assigned?
        if assessment.has_response?
          if assessment.response.completed?
            { title: "Consensus", active: true, type: :show_report }
          else
            { title: "Consensus", active: true, type: :edit_report }
          end
        else
          { title: "Consensus", active: true, type: :new_consensus }
        end
      else
        { title: "Consensus", active: false, type: :consensus }
      end
    end

    def report_link
      if fully_complete?
        return { title: 'Report', active: true, type: :report}
      end

      { title: 'Report', active: false , type: :report}
    end

    def message_link
      if assessment.assigned?
        { title: 'Messages', active: true, type: :messages }
      else
        { title: 'Messages', active: false , type: :messages }
      end
    end

    def dashboard_link
      if assessment.assigned?
        { title: 'Dashboard', active: true, type: :dashboard }
      else
        { title: 'Finish & Assign', active: true, type: :finish }
      end
    end

    private 
    def user_has_responses?
      @has_responses ||= user_responses.present?
    end

    def user_responses
      (user.participants
        .find_by(assessment: assessment)) &&

      (user.participants
        .find_by(assessment: assessment)
        .response)
    end

    def participant?
      @is_participant ||= assessment.participant?(user)
    end

    def facilitator?
      @is_facilitator ||= assessment.facilitator?(user)
    end

    def fully_complete?
      assessment.has_response? && assessment.response.completed? 
    end

  end
end
 
