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

    def create_consensus(assessment, rubric)
      Response.create!(responder_type: 'Assessment', responder_id: assessment.id, rubric_id: rubric.id)
    end

    def add_scores_from_participants(assessment, consensus, scores)
      scores.each do |score_data|
        participant_user = User.find_by(email: score_data[:participant][:user][:email])
        responder = Participant.find_by(user_id: participant_user.id, assessment_id: assessment.id)
        question  = consensus.questions.find_by(headline: score_data[:question][:headline])

        participant_response = Response.find_or_create_by(
          responder_type: 'Participant', responder_id: responder.id
        )
        participant_response.update_attribute(:rubric_id, assessment.rubric_id)

        score = Score.find_or_create_by(question_id: question.id, response_id: participant_response.id)
        score.update_attributes(evidence: score_data[:evidence], value: score_data[:value])
        
        question.scores << score
        question.save
      end
    end

    def add_participants(assessment, participants)
      participants.each do |participant_data|
        participant_user = User.find_by(email: participant_data[:user][:email])

        participant = Participant.find_or_create_by(
          assessment_id: assessment.id, user_id: participant_user.id
        )
        if participant_data[:invited_at]
          participant.update_attribute(:invited_at, Time.zone.parse(participant_data[:invited_at]))
        end

        assessment.participants << participant
      end
    end

    def create_assessments_with_data
      @assessments.each do |assessment_data|
        district   = District.find_by(name: assessment_data[:district_name])
        rubric     = Rubric.find_by(version: BigDecimal.new(assessment_data[:rubric_version]))
        owner      = User.find_by(email: assessment_data[:user][:email])

        assessment = Assessment.new(
          name: assessment_data[:name], due_date: Time.zone.parse(assessment_data[:due_date])
        )
        assessment.district = district
        assessment.rubric = rubric
        assessment.user = owner
        puts "Assessment: #{assessment.name}"
        puts "Saved: #{assessment.save}"

        #Adds the owner os a participant
        owner_participant = Participant.create!(assessment: assessment, user: owner)
        assessment.participants << owner_participant

        if assessment.persisted?
          consensus = create_consensus(assessment, rubric)
          add_participants(assessment, assessment_data[:participants])
        end

        if assessment_data[:assigned_at]
          assessment.update_attribute(:assigned_at, Time.zone.parse(assessment_data[:assigned_at]))
        end

        if assessment_data[:consensus][:submitted_at]
          consensus.update_attribute(:submitted_at, Time.zone.parse(assessment_data[:consensus][:submitted_at]))
        end

        unless assessment_data[:scores].empty?
          add_scores_from_participants(assessment, consensus, assessment_data[:scores])
        end

      end
    end

  end
end