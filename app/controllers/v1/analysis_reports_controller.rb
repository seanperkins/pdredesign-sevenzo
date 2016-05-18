class V1::AnalysisReportsController < ApplicationController
  before_action :authenticate_user!

  def comparison_data
    @comparison_data = fetch_comparison_data
  end

  private
  def fetch_comparison_data
    GeneralInventoryQuestion.find_by_sql ["SELECT
        giq.product_name,
        giq.price_in_cents,
        uq.usage
      FROM general_inventory_questions giq
        INNER JOIN product_entries pe ON giq.product_entry_id = pe.id
        INNER JOIN usage_questions uq ON uq.product_entry_id = pe.id
      WHERE pe.inventory_id IN (
        SELECT DISTINCT product_entries.inventory_id
        FROM product_entries
          INNER JOIN general_inventory_questions ON general_inventory_questions.product_entry_id = product_entries.id
        WHERE general_inventory_questions.id IN (
          SELECT DISTINCT UNNEST(supporting_inventory_responses.product_entries)
          FROM supporting_inventory_responses
          WHERE supporting_inventory_responses.score_id IN (SELECT scores.id
                                                            FROM scores
                                                            WHERE scores.response_id = ?)))",
                                         current_response.id]
  end

  def current_analysis
    @analysis ||= Analysis.where(id: params[:analysis_id]).first
  end

  def current_response
    @response ||= Response.where(responder: current_analysis).first
  end

end