participant_status = Analyses::ParticipantStatus.new(participant)

json.analysis_id participant.analysis_id
json.participant_id participant.user.id
json.status participant_status.status
json.status_human participant_status.to_s
json.status_date participant_status.date

json.partial! 'v1/shared/user', user: participant.user
