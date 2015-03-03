json.user do
  json.email  owner.email

  json.assessments do
    json.array! assessments do |assessment|
      json.id             assessment.id
      json.name           assessment.name
      json.rubric_id      assessment.rubric_id
      json.rubric_version assessment.rubric.version.to_s
      json.district_name  assessment.district.name
      json.district_id    assessment.district_id
      json.due_date       assessment.due_date.to_s
      json.assigned_at    assessment.assigned_at.to_s
      json.meeting_date   assessment.meeting_date

      json.partial! partial: "export_assessments/user_data.json.jbuilder", locals: { user: assessment.user }

      if assessment.response
        json.consensus do
          json.submitted_at assessment.response.submitted_at.to_s

          json.scores do
            json.array! assessment.response.scores do |score|
              json.partial! partial: "export_assessments/scores.json.jbuilder", locals: { score: score }
            end
          end
        end
      end

      json.participants do
        json.array! assessment.participants do |participant|
          json.participant_id   participant.id
          json.invited_at       participant.invited_at

          json.partial! partial: "export_assessments/user_data.json.jbuilder", 
            locals: { user: participant.user }

          if participant.response
            json.response do

              json.submitted_at participant.response.submitted_at.to_s

              json.scores do
                json.array! participant.response.scores do |score|
                  json.partial! partial: "export_assessments/scores.json.jbuilder", locals: { score: score }
                end
              end

            end
          end
        end
      end

      json.facilitators do
        json.array! assessment.facilitators.each do |facilitator|
          json.partial! partial: "export_assessments/user_data.json.jbuilder", 
            locals: { user: facilitator }
        end
      end

      json.partners do
        json.array! assessment.network_partners.each do |partner|
          json.partial! partial: "export_assessments/user_data.json.jbuilder", 
            locals: { user: partner }
        end
      end

      json.viewers do
        json.array! assessment.viewers.each do |viewer|
          json.partial! partial: "export_assessments/user_data.json.jbuilder", 
            locals: { user: viewer }
        end
      end

    end
  end

end