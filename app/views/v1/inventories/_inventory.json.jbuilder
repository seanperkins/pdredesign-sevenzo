json.id inventory.id
json.name inventory.name
json.user_id inventory.user_id
json.facilitator do
  json.partial! 'v1/shared/user', user: inventory.user
end
json.deadline inventory.deadline
json.district_id inventory.district_id
json.district_name inventory.district.name
json.created_at inventory.created_at
json.updated_at inventory.updated_at
json.status 'draft'
json.has_access current_user == inventory.user