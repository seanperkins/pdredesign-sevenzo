module Link
  class Partner

    attr_reader :tool, :user
    delegate :pending_requests?, :network_partner?, to: :tool

    def initialize(tool, user)
      @tool = tool
      @user = user
    end

    def execute
      {access: access}
    end

    private
    def access
      return pending if pending_requests?(user)
      request unless network_partner?(user)
    end

    def request
      {title: 'Request Access', type: :request_access}
    end

    def pending
      {title: 'Access Pending', type: :pending}
    end
  end
end
