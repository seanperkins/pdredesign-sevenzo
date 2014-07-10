json.array! @assessments do |assessment|
  json.partial! 'v1/assessments/assessment', 
                assessment: assessment

  linker = Assessments::Link.new(assessment, current_user)
  json.links           linker.links
  json.assessment_link linker.assessment_link

  json.subheading do
    subheading = Assessments::Subheading.new(assessment, @role)
    text, participants = subheading.text_and_participants
    json.text text
    json.participants participants do |participant|
      json.partial! 'v1/shared/user', user: participant.user 
    end
  end
end
