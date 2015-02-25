require 'fileutils'

namespace :db do

  desc "Import assessments from .json file created after export_assessments rake task"

  task :import_assessments, [:email] => :environment do |t,args|

    email = args[:email]
    migrated_filename = "#{email}/assessments.json"

    json_data = S3Wrapper.read(filename: migrated_filename)

    assessments = JSON.parse(json_data)

    import_data = Assessments::ImportData.new(assessments)
    import_data.to_db!
  end

end