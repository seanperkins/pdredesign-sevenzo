module ImportDataHelper
  def create_assessment(assessment_data, district, rubric)
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
    else
      puts "Some Error adding Assessment: #{assessment.name} - #{assessment.errors.full_messages}"
    end
    return assessment
  end

  def assign_assessment(assessment, assigned_at)
    if assigned_at
      assessment.update_attribute(:assigned_at, Time.zone.parse(assigned_at))
    end
  end

  def create_participants(assessment, participants)
    # Making the owner as a Participant of the assessment
    owner_participant = Participant.create!(assessment: assessment, user: owner)
    assessment.participants << owner_participant

    # Adding Assessment participants
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

  def create_score(score_data, include_scrore_to)
    score = Score.create(
      question_id: score_data[:question_id],
      response_id: score_data[:response_id],
      value: score_data[:value],
      evidence: score_data[:evidence]
    )

    if score.persisted?
      puts "score for #{include_scrore_to.class.to_s} was persisted"
      include_scrore_to.scores << score
      include_scrore_to.save
    else
      puts "failed when saving score for #{include_scrore_to.class.to_s}: #{score.errors.full_messages}"
    end

    return score
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

          score = create_score({ 
            question_id: question.id, 
            value: score_data[:value], 
            evidence: score_data[:evidence],
            response_id: response.id
          }, question)
        end
      else
        puts "Erors at response: #{response.errors.full_messages}"
      end
    end
  end

  def create_consensus(assessment, rubric)
    Response.create!(responder_type: 'Assessment', responder_id: assessment.id, rubric_id: rubric.id)
  end

  def prepare_consensus(assessment, consensus_data)
    if consensus_data
      consensus = create_consensus(assessment, assessment.rubric)
      if consensus_data[:submitted_at]
        consensus.update_attribute(:submitted_at, Time.zone.parse(consensus_data[:submitted_at]))
      end

      if consensus_data[:scores]
        consensus_data[:scores].each do |score_data|
          question = consensus.questions.find_by(headline: score_data[:question_headline]) 

          score = create_score({ 
              question_id: question.id, 
              value: score_data[:value], 
              response_id: consensus.id,
              evidence: score_data[:evidence]
          }, consensus)
        end
      end
    end
  end

end