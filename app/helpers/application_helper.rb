module ApplicationHelper
  def scores_for_assessment(assessment)
    assessment.all_scores
  end

  def timestamp(date_time)
    return unless date_time
    date_time.to_datetime.strftime("%s")
  rescue
    nil
  end
end
