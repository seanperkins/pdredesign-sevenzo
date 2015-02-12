require 'fileutils'

namespace :db do

  desc "Export assessments from user to a JSON file, suitable for importing"

  task :export_assessments, [:email] => :environment do |t,args|

    email = args[:email]
    migration_dir = "public/exported_assessments/#{email}"

    # Creating the directories
    FileUtils::mkdir_p(migration_dir)

    # Getting User
    user = User.find_by(email: email)

    assessments = Assessment.assessments_for_user(user)
    
    export_data = Assessments::ExportData.new(user, assessments)

    File.open("#{migration_dir}/assessments.json","w") do |f|
      f.write(export_data.in_json!)
    end
  end

end