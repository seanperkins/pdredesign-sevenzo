module Assessments
  class Link

    attr_reader :assessment, :role

    def initialize(assessment, role)
      @assessment = assessment
      @role       = role.to_sym
    end       

    def links
      return member_links if role == :member
      facilitator_links
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
      if fully_complete?(assessment)
        return { title: "Consensus", active: true, type: :show_response }
      end

      return { title: "Consensus", active: false, type: :none }
    end

    def consensus_link
      return member_consensus_link if role == :member

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
      if fully_complete?(assessment)
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
    def fully_complete?(asssessment)
      assessment.has_response? && assessment.response.completed? 
    end

  end
end
 
