module Link
  class AnalysisFacilitator

    attr_reader :analysis

    delegate :fully_complete?,  to: :analysis

    def initialize(analysis, *args)
      @analysis = analysis
    end

    def execute
      generate_links
    end

    private
    def generate_links
      if draft?
        {finish: finish}
      elsif fully_complete?
        {consensus: consensus, report: report, dashboard: dashboard}
      else
        {consensus: consensus, dashboard: dashboard}
      end
    end

    def finish
      {title: 'Finish & Assign', active: true, type: :finish}
    end

    def dashboard
      {title: 'View Dashboard', active: true, type: :dashboard}
    end

    def consensus
      if consensus?
        existing_consensus
      else
        new_consensus
      end
    end

    def existing_consensus
      {title: 'View Consensus', active: true, type: :consensus}
    end

    def new_consensus
      {title: 'Create Consensus', active: true, type: :new_consensus}
    end

    def report
      {title: 'View Report', active: consensus?, type: :report}
    end

    def consensus?
      analysis.status == :consensus
    end

    def draft?
      analysis.status == :draft
    end
  end
end