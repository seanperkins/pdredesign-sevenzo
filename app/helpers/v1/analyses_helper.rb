module V1
  module AnalysesHelper
    COL_SEP   = ','
    QUOTE_SEP = '"'

    def analyses_csv(analyses=[])
      CSV.generate(col_sep: COL_SEP, quote_char: QUOTE_SEP) do |csv_content|
        csv_content << analyses_headers

        analyses.each do |analysis|
          csv_content << analyses_mappings.values.map do |method|
            string = if method.is_a?(Proc)
              method.call(analysis)
            else
              analysis.send(method)
            end

            # nil and "" and " " should be treated the same way
            string.presence
          end
        end
      end
    end

    private

    def analyses_mappings
      {
        'ID' => :id,
        'Created At' => :created_at,
        'Updated At' => :updated_at,
        'Assigned At' => :assigned_at,
        'Inventory ID' => :inventory_id,
        'Deadline' => :deadline,
        'Report Takeaway' => :report_takeaway
      }
    end

    def analyses_headers
      analyses_mappings.keys.map(&:to_s)
    end
  end
end
