json.assessment_id              access_request.tool_id

json.partial! 'user_info', user: access_request.user, assessment: access_request.tool

json.requested_permission_level do
  json.array! access_request.roles do |role|
    json.role role
  end 
end