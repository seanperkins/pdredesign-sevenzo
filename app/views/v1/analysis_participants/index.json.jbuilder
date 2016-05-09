json.array! @participants do |participant|
  json.partial! 'v1/analysis_participants/participant', participant: participant
end
