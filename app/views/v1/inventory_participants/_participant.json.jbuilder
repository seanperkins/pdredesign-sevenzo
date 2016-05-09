participant_status = Inventories::ParticipantStatus.new(participant)

json.inventory_id participant.inventory_id
json.participant_id participant.user.id
json.status participant_status.status
json.status_human participant_status.to_s
json.status_date participant_status.date

json.partial! 'v1/shared/user', user: participant.user