module Link
  class Viewer

    attr_reader :assessment
    delegate :fully_complete?, to: :assessment

    def initialize(assessment, *args)
      @assessment = assessment
    end

    def execute
      { report: report }
    end

    private
    def report
      {title: 'Report', active: consensus?, type: :report}
    end

    def consensus?
      assessment.status == :consensus
    end

  end
end
