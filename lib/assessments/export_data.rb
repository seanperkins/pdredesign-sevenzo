require 'jbuilder'

module Assessments
  class ExportData
    include ApplicationHelper

    attr_reader :owner
    attr_reader :assessments
    def initialize(user, assessments)
      @owner        = user
      @assessments  = assessments
    end

    def in_json!
      builded_json = JbuilderTemplate.new(self) do |json|
        json.user do
          json.email  owner.email

          generate_assessments_template(json)
        end
      end
      builded_json.target!
    end

    protected
    def generate_assessments_template(json)
      json.assessments do
        json.array! assessments do |assessment|
          # Building Json structure

          json.id             assessment.id
          json.name           assessment.name
          json.rubric_id      assessment.rubric_id
          json.rubric_version assessment.rubric.version.to_s
          json.district_name  assessment.district.name
          json.district_id    assessment.district_id

          json.facilitators do
            assessment.facilitators.each do |facilitator|
              generate_user_template(json, facilitator)
            end
          end

          json.partners do
            assessment.network_partners.each do |partner|
              generate_user_template(json, partner)
            end
          end

          json.viewers do
            assessment.viewers.each do |viewer|
              generate_user_template(json, viewer)
            end
          end

          generate_consensus_template(json, assessment.response)

        end
      end
    end

    def generate_consensus_template(json, consensus)
      if consensus
        json.scores scores_for_assessment(consensus.responder) do |score|
          json.id          score.id
          json.value       score.value
          json.evidence    score.evidence
          json.response_id score.response_id
          json.question_id score.question_id

          generate_questions_template(json, score)
          generate_participant_template(json, score)

        end
      end
    end

    def generate_questions_template(json, score)
      json.question do
        question = score.question

        json.id           question.id
        json.headline     question.headline
        json.content      question.content
        json.order        question.order
        json.category_id  question.category_id
        json.help_text    question.help_text
      end
    end

    def generate_participant_template(json, score)
      json.participant do
        participant = score.response.responder
        participant_user = participant.user

        json.participant_id   participant.id
        # User information
        generate_user_template(json, participant_user)
      end
    end

    def generate_user_template(json, user)
      json.user do
        # Complete user data
        json.email              user.email
        json.encrypted_password user.encrypted_password
        json.role               user.role
        json.team_role          user.team_role
        json.admin              user.admin
        json.first_name         user.first_name
        json.last_name          user.last_name
        json.twitter            user.twitter
        json.avatar             user.avatar
        json.ga_dimension       user.ga_dimension
      end
    end
  end
end