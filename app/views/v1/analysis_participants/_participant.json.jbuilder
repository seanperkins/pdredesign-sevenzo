json.analysis_id participant.analysis_id
json.participant_id participant.user.id

json.partial! 'v1/shared/user', user: participant.user
