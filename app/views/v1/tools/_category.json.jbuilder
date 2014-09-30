json.id   category.id
json.name category.title
json.display_order category.display_order

json.subcategories category.tool_subcategories do |subcategory|
  json.partial! 'subcategory', subcategory: subcategory
end

json.tools controller.tools_for(category) do |tool|
  json.partial! 'tool', tool: tool 
end
