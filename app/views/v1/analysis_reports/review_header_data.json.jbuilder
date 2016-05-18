json.array! @categories do |category|
  json.category_name category.headline
  json.product_count category.product_count
end