module V1
  module DataEntriesHelper
    COL_SEP   = ','
    QUOTE_SEP = '"'

    def data_entries_csv(data_entries=[])
      CSV.generate(col_sep: COL_SEP, quote_char: QUOTE_SEP) do |csv_content|
        csv_content << data_entry_headers

        data_entries.each do |data_entry|
          csv_content << data_entry_mappings.values.map do |method|
            string = if method.is_a?(Proc)
              method.call(data_entry)
            else
              data_entry.send(method)
            end

            # nil and "" and " " should be treated the same way
            string.presence
          end
        end
      end
    end

    private

    def data_entry_mappings
      {
        'ID' => :id,
        'Created At' => :created_at,
        'Updated At' => :updated_at,
        'Inventory ID' => :inventory_id,
        'Data Type' => :data_type,
        'Point of Contact Name' => :point_of_contact_name,
        'Point of Contact Department' => :point_of_contact_department,
        'Data Capture' => :data_capture,
        'Who Enters Data' => :who_enters_data,
        'How Data is Entered' => :how_data_is_entered,
        'When Data is Entered' => :when_data_is_entered,
        'Data Storage' => :data_storage,
        'Who Accesses Data' => :who_access_data,
        'How Data is Accessed' => :how_data_is_accessed,
        'Why Data is Accessed' => :why_data_is_accessed,
        'Notes' => :notes
      }
    end

    def data_entry_headers
      data_entry_mappings.keys.map(&:to_s)
    end
  end
end
