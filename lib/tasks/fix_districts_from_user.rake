namespace :oneoff do
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
      else
        puts "User of district not found: #{user_district["Email"]} - #{user_district["Name [Districts]"]}"
      end
    end
  end
end