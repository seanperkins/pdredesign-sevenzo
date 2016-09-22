status = MembershipHelper.status(tool_member)
date = MembershipHelper.date(tool_member, status)

json.user_id tool_member.user.id
json.email tool_member.user.email
json.user_name tool_member.user.name
json.status status
json.status_human status.to_s.titleize
json.status_date date
json.avatar tool_member.user.avatar
json.twitter tool_member.user.twitter