json.array! @participants do |participant|
  json.partial! 'v1/inventory_participants/participant', participant: participant
end