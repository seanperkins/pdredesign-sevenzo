module Link
  class Assessment
    attr_reader :assessment, :user

    delegate :network_partner?,            to: :user
    delegate :facilitator?, :participant?, to: :assessment

    def initialize(assessment, user)
      @assessment = assessment
      @user       = user
    end       

    def execute
      target
        .new(assessment, user)
        .execute
    end

    private
    def target
      return Link::Facilitator if facilitator?(user)
      return Link::Participant if participant?(user)
      return Link::Partner     if network_partner?
      Link::Viewer
    end
  end
end
 
