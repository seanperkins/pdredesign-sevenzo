module Twitter
  class UpdateAvatar
    attr_reader :user
    def initialize(user)
      @user = user
    end
    
    def execute
      return unless twitter_handle_present?
      user.update(avatar: user_avatar)
    rescue Twitter::Error::NotFound
      nil
    end

    private
    def twitter_handle_present?
      return false if user.twitter == nil
      return false if user.twitter.empty?
      true
    end

    def user_avatar
      twitter_user = client.user(@user.twitter)
      return unless twitter_user

      twitter_user.profile_image_uri.to_s
    end

    def client
      @client ||= Twitter::REST::Client.new(client_config)
    end

    def client_config
      Rails.application.config.twitter_config
    end

  end
end
