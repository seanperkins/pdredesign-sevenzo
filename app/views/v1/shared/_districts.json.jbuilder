json.array! districts do |district|
  json.id district.id
  json.text "#{district.name} (#{district.city}. #{district.state})"
end

