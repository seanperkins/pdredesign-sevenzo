module Link
  class Facilitator

    attr_reader :assessment
    def initialize(assessment, *args)
      @assessment = assessment
    end

    def execute
      { dashboard: dashboard, consensus: consensus, report: report }
    end

    private
    def dashboard
      {title: 'Dashboard', active: true, type: :dashboard}
    end

    def consensus
      return new_consensus unless consensus?
      existing_consensus 
    end

    def existing_consensus
      {title: 'Consensus', active: true, type: :consensus}
    end

    def new_consensus
      {title: 'Consensus', active: true, type: :new_consensus}
    end

    def report
      {title: 'Report', active: consensus?, type: :report}
    end

    def consensus?
      assessment.status == :consensus
    end

  end
end
