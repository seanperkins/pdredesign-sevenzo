require 'fileutils'

namespace :db do

  desc "Export template tasks to a CSV file, suitable for importing"

  task :export_assessments, [:email] => :environment do |t,args|

    # TODO: put this method in a helper lib class
    def export_model(data, options)
      valid_columns = options[:valid_columns]
      filename      = options[:filename]

      csv_export_file = CSV.open(filename, "wb") do |csv|
        csv << valid_columns
        data.each do |data|
          csv << data.attributes.slice(*valid_columns).values
        end
      end
    end

    email = args[:email]
    migration_dir = "public/exported_assessments/#{email}"

    # Creating the directories
    FileUtils::mkdir_p(migration_dir)

    # Getting User
    user = User.find_by(email: email)

    # Getting Assessments data from user    
    assessments_filename = "#{migration_dir}/assessments.csv"
    valid_assessments_columns = Assessment.column_names.delete_if{ |k,v| k == "id" }
    assessments = Assessment.assessments_for_user(user)

    # Getting User Owners' assessments and participants
    user_owners = []
    participants = []
    # User
    user_owners_filename = "#{migration_dir}/user_owners_and_participants.csv"
    valid_user_columns = User.column_names.delete_if{ |k,v| k == "id" }
    # Participant
    participants_filename = "#{migration_dir}/participants.csv"
    valid_participant_columns = Participant.column_names.delete_if{ |k,v| k == "id" }


    assessments.each do |assessment|
      user = assessment.user
      unless user_owners.include?(user)
        user_owners << user
      end

      assessment.participants.each do |participant|
        unless  participants.include?(participant)
          participants << participant
        end
      end
    end


    # Exporting data to CSV
    export_model(user_owners, { valid_columns: valid_user_columns, filename: user_owners_filename })
    export_model(assessments, { valid_columns: valid_assessments_columns, filename: assessments_filename})
    export_model(participants, { valid_columns: valid_participant_columns, filename: participants_filename })
  end

end