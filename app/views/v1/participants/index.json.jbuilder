json.array! @participants do |participant|
  json.participant_id participant.id
  json.partial! 'v1/shared/user', user: participant.user
end

