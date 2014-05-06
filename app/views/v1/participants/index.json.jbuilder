json.array! @participants do |participant|
  json.partial! 'v1/shared/user', user: participant.user
end

