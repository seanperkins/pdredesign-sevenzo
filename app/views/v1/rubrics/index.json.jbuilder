json.array! @rubrics do |rubric|
  json.id      rubric.id
  json.name    rubric.versioned_name
  json.version rubric.version
  json.enabled rubric.enabled
end
