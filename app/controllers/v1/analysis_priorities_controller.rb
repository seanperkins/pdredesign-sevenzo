class V1::AnalysisPrioritiesController < ApplicationController
  before_action :authenticate_user!
  # authorize_actions_for :analysis

  def index
    @scores_and_relevant_data = build_scores_and_relevant_data
  end

  def create
    priority = Priority.find_or_initialize_by(tool: current_analysis)
    priority.order = params[:order]
    priority_existed_prior = priority.id.present?

    if priority.save
      render nothing: true, status: (priority_existed_prior ? :no_content : :created)
    else
      render nothing: true, status: :bad_request
    end
  end

  private
  def current_analysis
    @analysis ||= Analysis.where(id: params[:analysis_id]).first
  end

  def analysis_priority_params
    params.permit(:order)
  end

  def build_scores_and_relevant_data
    # Utilize the Score model to build out all of the relevant pieces that we care about.
    # Note that we are shoehorning in a value 0 for several columns to be computed separately.

    scores_and_relevant_data =
        Score.select('scores.value',
                     'questions.headline',
                     'questions.order',
                     'rubrics.id AS rubric_id',
                     'supporting_inventory_responses.product_entries',
                     'supporting_inventory_responses.data_entries',
                     'supporting_inventory_responses.product_entry_evidence',
                     'supporting_inventory_responses.data_entry_evidence',
                     '0 AS product_count',
                     '0 AS data_count',
                     '0 AS total_cost_yearly')
            .joins('INNER JOIN questions ON scores.question_id = questions.id
                               INNER JOIN supporting_inventory_responses ON supporting_inventory_responses.score_id = scores.id
                               INNER JOIN questions_rubrics ON questions_rubrics.question_id = questions.id
                               INNER JOIN rubrics ON rubrics.id = questions_rubrics.rubric_id
                               INNER JOIN responses ON scores.response_id = responses.id')
            .where(rubrics: {id: current_analysis.rubric.id},
                   responses: {responder_type: Analysis.to_s,
                               responder_id: current_analysis.id})
            .order('questions.order ASC')

    scores_and_relevant_data.each { |score|
      score.product_count = score.product_entries.size
      score.data_count = score.data_entries.size
      score.total_cost_yearly = GeneralInventoryQuestion.where(id: score.product_entries).sum(:price_in_cents)
    }

    scores_and_relevant_data

  end
end