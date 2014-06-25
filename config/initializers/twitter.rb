Rails.application.config.twitter_config = {
  consumer_key:         ENV['TWITTER_CONSUMER_KEY'],
  consumer_secret:      ENV['TWITTER_CONSUMER_SECRET'],
  access_token:         ENV['TWITTER_ACCESS_TOKEN'],
  access_token_secret:  ENV['TWITTER_ACCESS_SECRET']
}

# twitter_rest_client = Twitter::REST::Client.new(Rails.config.twitter_config)

