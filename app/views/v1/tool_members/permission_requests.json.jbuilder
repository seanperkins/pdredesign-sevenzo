json.array! @requests do |access_request|
  permission = ToolMembers::Permission.new(access_request.tool, access_request.user)
  json.access_request_id access_request.id
  json.tool_id access_request.tool_id
  json.avatar avatar_image(access_request.user.avatar)
  json.full_name access_request.user.name
  json.current_permission_levels do
    json.roles permission.roles
  end
  json.requested_permission_levels do
    json.roles access_request.roles
  end
end