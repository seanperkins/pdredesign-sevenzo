index = 0
json.array! @categories do |category|
  index += 1
  json.id             category[:id]
  json.order          index
  json.name           category[:name]
  json.average        category[:average]
  json.diagnostic_suggested @diagnostic_min > category[:average]
  json.diagnostic_min       @diagnostic_min
end
