module SharedAnalysisFetch
  extend ActiveSupport::Concern

  def analysis
    inventory_id = params[:inventory_id]
    id = params[:analysis_id] || params[:id]
    @analysis = Analysis.where('inventory_id = ? AND (analyses.id = ? OR analyses.share_token = ?)', inventory_id.to_i, id.to_i, id).first
    unless @analysis
      render nothing: true, status: :not_found
      return nil
    end
    unless @analysis.share_token == id
      authenticate_user!
      authorize_action_for @analysis
    end
    @analysis
  end
end

