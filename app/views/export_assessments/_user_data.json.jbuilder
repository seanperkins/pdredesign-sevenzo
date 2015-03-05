json.user do
  json.email              user.email
  json.encrypted_password user.encrypted_password
  json.role               user.role
  json.team_role          user.team_role
  json.admin              user.admin
  json.first_name         user.first_name
  json.last_name          user.last_name
  json.twitter            user.twitter
  json.avatar             user.avatar
  json.ga_dimension       user.ga_dimension

  json.districts do
    json.array! user.districts do |district|
      json.name     district.name
      json.lea_id   district.lea_id
    end
  end
end