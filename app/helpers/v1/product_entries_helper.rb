module V1
  module ProductEntriesHelper
    COL_SEP   = ','
    QUOTE_SEP = '"'

    def product_entries_csv(product_entries=[])
      CSV.generate(col_sep: COL_SEP, quote_char: QUOTE_SEP) do |csv_content|
        csv_content << product_entry_headers

        product_entries.each do |product_entry|
          csv_content << product_entry_mappings.values.map do |method|
            string = if method.is_a?(Proc)
              method.call(product_entry)
            else
              product_entry.send(method)
            end

            # nil and "" and " " should be treated the same way
            string.presence
          end
        end
      end
    end

    private

    def product_entry_mappings
      {
        'ID' => :id,
        'Created At' => :created_at,
        'Updated At' => :updated_at,
        'Inventory ID' => :inventory_id,
        'Product Name' => :product_name,
        'Vendor' => :vendor,
        'Point of Contact Name' => :point_of_contact_name,
        'Point of Contact Department' => :point_of_contact_department,
        'Pricing Structure' => :pricing_structure,
        'Price' => ->(pe){ pe.price_in_cents.try(:*, 100) },
        'Data Type' => ->(pe){ pe.data_type.try(:join, '|') },
        'Purpose' => :purpose,
        "How it's assigned" => ->(pe){ pe.how_its_assigned.try(:join, '|') },
        "How it's used" => ->(pe){ pe.how_its_used.try(:join, '|') },
        "How it's accessed" => ->(pe){ pe.how_its_accessed.try(:join, '|') },
        'Audience' => ->(pe){ pe.audience.try(:join, '|') },
        'School Usage' => :school_usage,
        'Usage' => :usage,
        'Vendor Data' => :vendor_data,
        'Notes' => :notes,
        'Platforms' => ->(pe){ pe.platforms.try(:join, '|') },
        'Hosting' => :hosting,
        'Connectivity' => ->(pe){
          product_names = pe.connectivity.try(:map){ |product_entry_id|
            ProductEntry.find(product_entry_id).try(:product_name)
          }
          product_names.try(:join, '|')
        },
        'Single Sign On' => :single_sign_on
      }
    end

    def product_entry_headers
      product_entry_mappings.keys.map(&:to_s)
    end
  end
end
