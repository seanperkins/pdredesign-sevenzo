module Link
  class Participant

    attr_reader :assessment
    delegate :fully_complete?, to: :assessment
    delegate :completed?, to: :assessment

    def initialize(assessment, *args)
      @assessment = assessment
    end

    def execute
      return nil if draft?
      completed_condition = consensus? ? fully_complete? : completed?

      if completed_condition
        { report: report, action: action }
      else
        { action: action }
      end
    end

    private
    def action
      return response unless consensus?
      return edit_response unless fully_complete?
      consensus
    end

    def response
      {title: 'Complete Survey', active: true, type: :response}
    end

    def edit_response
      {title: 'Edit Survey', active: true, type: :response}
    end

    def report
      {title: 'View Report', active: fully_complete?, type: :report}
    end

    def consensus
      {title: 'Consensus', active: fully_complete?, type: :consensus}
    end

    def consensus?
      assessment.status == :consensus
    end

    def draft?
      assessment.status == :draft
    end

  end
end
