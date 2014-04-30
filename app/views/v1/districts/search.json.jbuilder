json.results do
  json.array! @results do |result|
    json.id result.id
    json.text "#{result.name} (#{result.city}. #{result.state})"
  end
end

