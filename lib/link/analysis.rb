module Link
  class Analysis
    attr_reader :analysis, :user

    delegate :facilitator?, :participant?, to: :analysis

    def initialize(analysis, user)
      @analysis = analysis
      @user = user
    end

    def execute
      target.new(analysis, user)
      .execute
    end

    private
    def target
      return Link::AnalysisFacilitator if facilitator?(user)
      return Link::AnalysisParticipant if participant?(user)
      Link::Partner
    end
  end
end