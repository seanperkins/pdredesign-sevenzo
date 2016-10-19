json.user do
  json.id @candidate.user_id
  json.tool_type @candidate.tool_type
  json.tool_id @candidate.tool_id
  json.roles @candidate.roles
end
