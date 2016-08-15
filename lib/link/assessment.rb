module Link
  class Assessment
    attr_reader :assessment, :user

    delegate :network_partner?, to: :user
    delegate :facilitator?, :viewer?, :participant?, to: :assessment

    def initialize(assessment, user)
      @assessment = assessment
      @user = user
    end

    def execute
      target.new(assessment, user)
            .execute
    end

    private
    def target
      return Link::Facilitator if facilitator?(user)
      return Link::Participant if participant?(user)
      Link::Partner
    end
  end
end
