module Link
  class Partner 

    attr_reader :assessment, :user
    delegate :network_partner?, to: :assessment

    def initialize(assessment, user)
      @assessment = assessment
      @user       = user
    end

    def execute
      { access: access}
    end

    private
    def access
      return request unless network_partner?(user)
      pending
    end

    def request
      { title: 'Request Access', type: :request_access, active: true }
    end

    def pending
      { title: 'Access Pending', type: :pending, active: false }
    end

  end
end