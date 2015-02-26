module Assessments
  class ImportData
    include ScoreQuery

    attr_accessor :assessments, :owner

    def initialize(data)
      data = HashWithIndifferentAccess.new(data)
      @assessments = data[:user][:assessments]
      @owner = User.find_by(email: data[:user][:email])
    end

    def to_db!
      create_assessments_with_data
    end

    protected

    def create_assessments_with_data
      @assessments.each do |assessment_data|
        district   = District.find_by(name: assessment_data[:district_name])
        rubric     = Rubric.find_by(version: BigDecimal.new(assessment_data[:rubric_version]))
        owner      = User.find_by(email: assessment_data[:user][:email])

        assessment_params = {
          name: assessment_data[:name], 
          due_date: Time.zone.parse(assessment_data[:due_date]),
          district: district,
          rubric: rubric,
          user: owner
        }

        if assessment_data[:meeting_date]
          assessment_params.merge!(
            meeting_date: Time.zone.parse(assessment_data[:meeting_date])
          )
        end

        assessment = Assessment.create(assessment_params)

        if assessment.persisted?
          puts "Assessment: #{assessment.name}"
          puts "Saved: true"

          #Adds the owner os a participant
          owner_participant = Participant.create!(assessment: assessment, user: owner)
          assessment.participants << owner_participant

          add_participants(assessment, assessment_data[:participants])
        end

        if assessment_data[:assigned_at]
          assessment.update_attribute(:assigned_at, Time.zone.parse(assessment_data[:assigned_at]))
        end

        if assessment_data[:consensus]
          consensus = create_consensus(assessment, rubric)
          if assessment_data[:consensus][:submitted_at]
            consensus.update_attribute(:submitted_at, Time.zone.parse(assessment_data[:consensus][:submitted_at]))
          end

          if assessment_data[:consensus][:scores]
            assessment_data[:consensus][:scores].each do |score_data|
              question = consensus.questions.find_by(headline: score_data[:question_headline]) 

              score     = Score.create(
                question_id: question.id,
                response_id: consensus.id,
                value: score_data[:value],
                evidence: score_data[:evidence]
              )

              if score.persisted?
                puts "score for consensus was persisted"
                consensus.scores << score
                consensus.save
              else
                puts "failed when saving score for consensus: #{score.errors.full_messages}"
              end
            end
          end
        end

      end
    end

    def create_consensus(assessment, rubric)
      Response.create!(responder_type: 'Assessment', responder_id: assessment.id, rubric_id: rubric.id)
    end

    def add_participants(assessment, participants)
      participants.each do |participant_data|
        participant_user = User.find_by(email: participant_data[:user][:email])

        if participant_user.nil?
          participant_user = create_user_with(participant_data[:user])
        end

        participant = Participant.find_or_create_by(
          assessment_id: assessment.id, user_id: participant_user.id
        )
        if participant_data[:invited_at]
          participant.update_attribute(:invited_at, Time.zone.parse(participant_data[:invited_at]))
        end

        assessment.participants << participant

        create_participant_scores(
          participant, 
          assessment, 
          participant_data[:response]
        )
      end
    end

    def create_participant_scores(participant, assessment, participant_response)
      if participant_response
        scores = participant_response[:scores]

        response = Response.create(
          responder_id: participant.id, 
          responder_type: 'Participant',
          rubric: assessment.rubric,
          submitted_at: Time.zone.parse(participant_response[:submitted_at])
        )

        if response.persisted?
          puts "Response persisted"

          scores.each do |score_data|
            question  = assessment.rubric.questions.find_by(headline: score_data[:question_headline])
            score     = Score.create(
              question_id: question.id, 
              response_id: response.id, 
              value: score_data[:value],
              evidence: score_data[:evidence]
            )

            if score.persisted?
              puts "Score persisted"

              question.scores << score
              question.save

            else
              puts "Some errors at Score, #{score.errors.full_messages}"
            end
          end

        else
          puts "Erors at response: #{response.errors.full_messages}"
        end
      end
    end

    def create_user_with(user_data)
      new_user = User.new(
        email: user_data[:email],
        first_name: user_data[:first_name],
        role: user_data[:role],
        last_name: user_data[:last_name],
        encrypted_password: user_data[:encrypted_password],
        avatar: user_data[:avatar]
      )
      new_user.save(validate: false)
      new_user
    end

  end
end