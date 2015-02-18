require 'fileutils'

namespace :db do

  desc "Import assessments from .json file created after export_assessments rake task"

  task :import_assessments, [:email] => :environment do |t,args|

    email = args[:email]
    migration_dir = "public/exported_assessments/#{email}"

    json_data = File.read("#{migration_dir}/assessments.json")

    assessments = JSON.parse(json_data)

    import_data = Assessments::ImportData.new(assessments)
    import_data.to_db!
  end

end