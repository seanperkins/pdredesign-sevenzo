json.constants do
  json.general_inventory_question do
    json.pricing_structure_options GeneralInventoryQuestion.pricing_structure_options
    json.product_types GeneralInventoryQuestion.product_types
  end
  json.product_question do
    json.assignment_approaches ProductQuestion.assignment_approaches
    json.usage_frequencies ProductQuestion.usage_frequencies
    json.accesses ProductQuestion.accesses
    json.audience_types ProductQuestion.audience_types
  end
  json.technical_question do
    json.platform_options TechnicalQuestion.platform_options
    json.hosting_options TechnicalQuestion.hosting_options
    json.single_sign_on_options TechnicalQuestion.single_sign_on_options
  end
end
