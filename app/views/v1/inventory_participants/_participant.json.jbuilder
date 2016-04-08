json.inventory_id participant.inventory_id
json.participant_id participant.user.id

json.partial! 'v1/shared/user', user: participant.user