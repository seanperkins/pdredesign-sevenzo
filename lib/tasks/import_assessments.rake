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

  task :fix_user_district, [:email] => :environment do |t,args|
    require 'csv'
    email = args[:email]

    csv_user_list_file = "#{email}/users_districs.csv"

    rows_from_csv = CSV.parse(S3Wrapper.read(filename: csv_user_list_file), headers: true)

    rows_from_csv.each do |row|
      user_district = row.to_hash

      user      = User.find_by(email: user_district["Email"])
      district  = District.find_by(lea_id: user_district["Lea [Districts]"])

      if user && district
        puts "Adding User #{user.email} To #{district.name} district"

        user.districts << district unless user.district_ids.include?(district.id)
        if user.save
          puts "Added Successfully"
        else
          puts "Some error came up while trying to add #{user.email} to #{district.name}: #{user.errors.full_messages}"
        end
      end
    end
  end

end