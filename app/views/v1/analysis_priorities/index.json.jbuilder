index = 0
json.array! @categories do |category|
  index +=1
  json.id category[:id]
  json.order index
  json.name category[:name]
  json.score 0
  json.products 0
  json.data 0
  json.total_yearly_cost 0
end