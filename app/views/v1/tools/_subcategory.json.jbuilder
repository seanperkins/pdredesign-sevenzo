json.id            subcategory.id
json.name          subcategory.title
json.display_order subcategory.display_order


json.tools controller.tools_for(subcategory) do |tool|
  json.partial! 'tool', tool: tool
end
