module V1
  module AnalysisConsensusHelper
    COL_SEP   = ','
    QUOTE_SEP = '"'

    def analysis_consensus_csv(analysis_consensus={})
      scores_and_relevant_data = Analyses::Priority.new(analysis: analysis_consensus.responder).ordered_list
      CSV.generate(col_sep: COL_SEP, quote_char: QUOTE_SEP) do |csv_content|
        csv_content << analysis_consensus_headers

        scores_and_relevant_data.each do |score|
          csv_content << analysis_consensus_mappings.values.map do |method|
            string = if method.is_a?(Proc)
              method.call(score)
            else
              score.send(method)
            end

            # nil and "" and " " should be treated the same way
            string.presence
          end
        end
      end
    end

    private

    def counter
      @counter ||= 0
      @counter = @counter + 1
    end

    def analysis_consensus_mappings
      {
        'Priority' => ->(*){ counter },
        'Category' => :headline,
        'Score' => :value,
        'Products' => :product_count,
        'Data' => :data_count,
        'Product Notes' => :product_entry_evidence,
        'Data Notes' => :data_entry_evidence,
        'Total Costs Yearly (USD)' => ->(ac){ ac.total_cost_yearly / 100 }
      }
    end

    def analysis_consensus_headers
      analysis_consensus_mappings.keys.map(&:to_s)
    end
  end
end
