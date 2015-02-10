require 'fileutils'

namespace :db do

  desc "Export template tasks to a CSV file, suitable for importing"

  task :export_assessments, [:email] => :environment do |t,args|

    include ApplicationHelper
    include ScoreQuery

    # TODO: put this method in a helper lib class
    def export_model(data, options)
      valid_columns = options[:valid_columns]
      filename      = options[:filename]

      csv_export_file = CSV.open(filename, "wb") do |csv|
        csv << valid_columns
        data.each do |data|
          unless data.nil?
            csv << data.attributes.slice(*valid_columns).values
          end
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
    valid_assessments_columns = Assessment.column_names
    assessments = Assessment.assessments_for_user(user)

    # Getting User Owners' assessments and participants
    user_owners = []
    participants = []
    rubrics = []
    consensus = []
    categories = []
    questions = []
    scores = []
    # User
    user_owners_filename = "#{migration_dir}/user_owners_and_participants.csv"
    valid_user_columns = User.column_names
    # Participant
    participants_filename = "#{migration_dir}/participants.csv"
    valid_participant_columns = Participant.column_names
    # Rubrics
    rubric_filename = "#{migration_dir}/rubrics.csv"
    valid_rubric_columns = Rubric.column_names
    # Response/Consensus
    response_filename = "#{migration_dir}/consensus.csv"
    valid_consensus_columns = Response.column_names
    # Category
    categories_filename = "#{migration_dir}/categories.csv"
    valid_categories_columns = Category.column_names
    # Question
    questions_filename = "#{migration_dir}/questions.csv"
    valid_questions_columns = Question.column_names
    # Score
    scores_filename = "#{migration_dir}/scores.csv"
    valid_scores_columns = Score.column_names

    assessments.each do |assessment|
      user      = assessment.user
      rubric    = assessment.rubric
      response  = assessment.response

      unless user_owners.include?(user)
        user_owners << user
      end

      unless rubrics.include?(rubric)
        rubrics << rubric
      end

      unless consensus.include?(response)
        consensus << response
      end

      if response
        # filling scores
        response_scores = ApplicationHelper.scores_for_assessment(response.responder)
        response_scores.each do |score|
          scores << score
          # storing participant
          participant = score.participant
          unless participants.include?(participant)
            participants << participant
          end
          # user participant
          user = participant.user
          unless user_owners.include?(user)
            user_owners << user
          end
        end

        response.categories.each do |category|
          unless categories.include?(category)
            categories << category
          end

          category.rubric_questions(rubric) do |question|
            unless questions.include?(question)
              questions << question
            end

          end
        end
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
    export_model(rubrics, { valid_columns: valid_rubric_columns, filename: rubric_filename })
    # TODO: Consensus linked with proper assessment ID.
    export_model(consensus, { valid_columns: valid_consensus_columns, filename: response_filename })
    export_model(categories, { valid_columns: valid_categories_columns, filename: categories_filename })
    export_model(questions, { valid_columns: valid_questions_columns, filename: questions_filename })
    export_model(scores, { valid_columns: valid_scores_columns, filename: scores_filename })
  end

end