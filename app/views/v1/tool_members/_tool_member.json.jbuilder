status = MembershipHelper.status(tool_member)
date = MembershipHelper.date(tool_member, status)

json.tool_id tool_member.tool_id
json.status status
json.status_human status.to_s
json.status_date date
json.avatar tool_member.user.avatar
json.twitter tool_member.user.twitter