module ApplicationHelper
  def scores_for_assessment(assessment)
    assessment.all_scores
  end
end
