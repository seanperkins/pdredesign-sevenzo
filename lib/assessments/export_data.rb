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
          json.due_date       assessment.due_date.to_s
          json.assigned_at    assessment.assigned_at.to_s
          json.meeting_date   assessment.meeting_date

          generate_user_template(json, assessment.user)

          if assessment.response
            json.consensus do
              json.submitted_at assessment.response.submitted_at.to_s

              json.scores do
                json.array! assessment.response.scores do |score|
                  generate_score_template(json, score)
                end
              end
            end
          end

          json.participants do
            json.array! assessment.participants do |participant|
              json.participant_id   participant.id
              json.invited_at       participant.invited_at

              generate_user_template(json, participant.user)

              if participant.response
                json.response do

                  json.submitted_at participant.response.submitted_at.to_s

                  json.scores do
                    json.array! participant.response.scores do |score|
                      generate_score_template(json, score)
                    end
                  end

                end

                
              end

            end
          end

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

        end
      end
    end

    def generate_score_template(json, score)
      json.question_headline      score.question.headline
      json.value                  score.value
      json.evidence               score.evidence
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