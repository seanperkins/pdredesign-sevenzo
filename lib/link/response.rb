module Link
  class Response

    attr_reader :assessment, :user

    delegate :assigned?, :participant?,
      :network_partner?,
      :facilitator?, :fully_complete?, to: :assessment

    def initialize(assessment, user)
      @assessment = assessment
      @user       = user
    end       

    def execute 
      return :none         unless associated?
      return :none         unless assigned?
      return :consensus    if fully_complete? 
      return :response     if user_has_responses? 
      return :new_response if participant?(user)
      :none
    end

    private 
    def associated?
      participant?(user) || facilitator?(user) || network_partner?(user)
    end

    def user_has_responses?
      @has_responses ||= user_responses.present?
    end

    def user_responses
      (user.participants
        .find_by(assessment: assessment)) &&

      (user.participants
        .find_by(assessment: assessment)
        .response)
    end

  end
end
