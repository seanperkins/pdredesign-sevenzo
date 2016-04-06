json.data_entries @data_entries do |data_entry|
  json.partial! 'v1/data_entries/data_entry', data_entry: data_entry
end
