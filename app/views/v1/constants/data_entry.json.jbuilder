json.constants do
  json.general_data_question do
    json.data_types GeneralDataQuestion.data_type_options
    json.data_capture_options GeneralDataQuestion.data_capture_options
  end
  json.data_entry_question do
    json.data_entered_frequencies DataEntryQuestion.data_entered_frequencies
  end
  json.data_access_question do
    json.data_accessed_bies DataAccessQuestion.data_accessed_bies
  end
end
