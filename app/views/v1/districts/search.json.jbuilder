json.results do
  json.partial! 'v1/shared/districts',
    districts: @results
end

