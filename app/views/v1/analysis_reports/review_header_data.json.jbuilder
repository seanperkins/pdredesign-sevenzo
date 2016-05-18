json.array! @categories do |category|
  json.category_name category.headline
  json.product_count category.product_count
  json.supporting_response_id category.supporting_response_id
  json.product_titles do
    json.array! controller.fetch_review_body_data(category.supporting_response_id) do |general_inventory_question|
      json.product_name general_inventory_question.product_name
    end
  end
end