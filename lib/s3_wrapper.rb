require 'aws/s3'

class S3Wrapper
  class << self
    # valid options for this method are:
    # :filename, :content, :content_type
    def store(options)
      stablish_connection

      AWS::S3::S3Object.store(
        options[:filename],
        options[:content],
        Rails.application.secrets.s3_bucket,
        content_type: options[:content_type]
      )
    end

    # valid options for this method are:
    # :filename
    def read(options)
      stablish_connection

      AWS::S3::S3Object.value(options[:filename], Rails.application.secrets.s3_bucket)
    end

    protected
    def stablish_connection
      AWS::S3::Base.establish_connection!(
        :access_key_id     => Rails.application.secrets.s3_access_key,
        :secret_access_key => Rails.application.secrets.s3_secret_key
      )
    end
  end
end