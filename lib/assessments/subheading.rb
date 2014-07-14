module Assessments
  class Subheading
    
    attr_reader :assessment, :user

    delegate :participant?,     to: :assessment
    delegate :facilitator?,     to: :assessment
    delegate :network_partner?, to: :user

    def initialize(assessment, user)
      @assessment = assessment
      @user       = user
    end

    def execute
      return invited           if participant?(user)
      return viewed_report     if facilitator?(user) && consensus?
      return not_yet_submitted if facilitator?(user) && !consensus?
      facilitated
    end

    def message
      execute[:message]
    end

    def users
      execute[:members]
    end

    private
    def consensus?
      assessment.status == :consensus
    end

    def facilitated
      {message: 'Facilitated by:',
       members: facilitators}
    end

    def invited
      {message: 'Invited by:',
       members: facilitators}
    end

    def viewed_report
      {message: 'Viewed report:',
       members: members(:participants_viewed_report)}
    end

    def not_yet_submitted
      {message: 'Not yet submitted:',
       members: members(:participants_not_responded)}
    end

    def facilitators
      [assessment.user] + assessment.facilitators
    end

    def members(method)
      users_from_participants(assessment.send(method))
    end

    def users_from_participants(participants)
      participants.map(&:user)
    end
    
  end
end
