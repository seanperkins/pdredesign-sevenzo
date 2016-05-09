json.product_entries @product_entries do |product_entry|
  json.partial! 'v1/product_entries/product_entry', product_entry: product_entry
end
