json.partial! 'v1/shared/user', user: user
json.assessment_id assessment_id if defined? assessment_id
json.inventory_id inventory_id if defined? inventory_id
