module Link
  class AnalysisParticipant

    attr_reader :analysis
    delegate :fully_complete?, :completed?, to: :analysis

    def initialize(analysis, *args)
      @analysis = analysis
    end

    def execute
      return nil if draft?
      completed = consensus? ? fully_complete? : completed?
      links = {}
      links.merge!({action: action}) if action
      if completed
        links.merge!({report: report})
      end
      links
    end

    private
    def action
      return response unless consensus?
      return edit_response unless fully_complete?
    end

    def response
      {title: 'Complete Analysis', active: true, type: :response}
    end

    def edit_response
      {title: 'Edit Analysis', active: true, type: :response}
    end

    def report
      {title: 'View Report', active: fully_complete?, type: :report}
    end

    def consensus
      {title: 'Consensus', active: fully_complete?, type: :consensus}
    end

    def consensus?
      analysis.status == :consensus
    end

    def draft?
      analysis.status == :draft
    end
  end
end
