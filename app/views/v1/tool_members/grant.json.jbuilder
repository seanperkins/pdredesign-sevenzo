json.array! @candidates do |candidate|
  json.partial! 'v1/tool_members/eligible_tool_members', candidate: candidate
end