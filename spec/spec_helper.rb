# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'shoulda/matchers'

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.check_pending! if defined?(ActiveRecord::Migration)

RSpec.configure do |config|
  # ## Mock Framework
  #
  # If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # If true, the base class of anonymous controllers will be inferred
  # automatically. This will be the default behavior in future versions of
  # rspec-rails.
  config.infer_base_class_for_anonymous_controllers = false

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = "random"
  config.include Requests::JsonHelpers, type: :controller
  config.include Devise::TestHelpers, :type => :controller
end

Authority.configure do |config|
  config.logger = Logger.new('/dev/null')
end

def active_record_error(record, field, error)
  expect(record.errors_on(field)).to include(error)
end

def no_active_record_error(record, field, error)
  expect(record.errors_on(field)).not_to include(error)
end

def create_struct
  responder = Participant.create!(user: @user)
  rubric    = @rubric
  response  = Response.create!(
    responder_type: 'Assessment', 
    responder: responder,
    rubric: rubric,
    id: 99)

  category1 = Category.create!(name: "first")
  category2 = Category.create!(name: "second")
  category3 = Category.create!(name: "third")

  3.times do |i|
    question = rubric
      .questions
      .create!(category: category1, headline: "headline #{i}")
    4.times do |value|
      Answer.create!(question: question, value: value+1, content: 'some content')
    end
    Score.create!(question: question, response: response, evidence: "expected")
  end

  3.times { rubric.questions.create!(category: category2) }
  3.times { rubric.questions.create!(category: category3) }
end


def create_magic_assessments
  @district     = District.create!
  @facilitator  = Application::create_sample_user(districts: [@district])
  @facilitator2 = Application::create_sample_user(districts: [@district])
  @user         = Application::create_sample_user(districts: [@district], role: :member)
  @user2        = Application::create_sample_user(districts: [@district], role: :member)
  @user3        = Application::create_sample_user(districts: [@district], role: :member)
  @participant  = Participant.create!(user: @user)
  @participant2 = Participant.create!(user: @user2)
  @rubric       = Rubric.create!

  3.times do |i|
    Assessment.create!(
      name: "Assessment #{i}",
      rubric: @rubric,
      participants: [],
      district: @district,
      user: @facilitator,
    )
  end

  @district2    = District.create!
  @facilitator3 = Application::create_sample_user(districts: [@district2])
  @user.update(district_ids: @user.district_ids + [@district2.id])

  @assessment_with_participants = Assessment.create!(
    name: "Assessment other",
    rubric: @rubric,
    participants: [@participant, @participant2],
    district: @district2,
    user: @facilitator2,
    due_date: Time.now,
    message: 'some message',
  )
end

module Application
  class << self
    def create_user(opts = {})
      attributes = {
        email: Faker::Internet.email, 
        password: 'sup3r_s3cr3t',
        role:  :member,
        admin: false,
        first_name: 'Example',
        last_name: 'User'
      }.merge(opts)

      User.create! attributes
    end

    def create_district(opts = {})
      District.create! opts
    end

    def create_sample_user(opts = {})
      district = Application.create_district
      Application.create_user({ role: :facilitator, districts: [district]}.merge(opts))
    end
  end
end
