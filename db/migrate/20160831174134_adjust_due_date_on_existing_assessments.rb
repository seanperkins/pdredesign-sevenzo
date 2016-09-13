class AdjustDueDateOnExistingAssessments < ActiveRecord::Migration
  PRODUCTION_ROLLBACK_VALUES = [[261, "2016-08-29 04:00:00 UTC"],
                                [249, "2016-04-29 04:00:00 UTC"],
                                [226, "2016-03-02 05:00:00 UTC"],
                                [221, "2001-04-29 05:00:00 UTC"],
                                [195, "2015-06-02 04:00:00 UTC"],
                                [194, "2015-06-02 04:00:00 UTC"],
                                [190, "2015-05-20 05:00:00 UTC"],
                                [185, "2015-05-12 05:00:00 UTC"],
                                [183, "2015-05-12 05:00:00 UTC"],
                                [182, "2015-05-12 05:00:00 UTC"],
                                [181, "2015-05-09 05:00:00 UTC"],
                                [176, "2015-05-08 06:00:00 UTC"],
                                [164, "2015-03-31 04:00:00 UTC"],
                                [146, "2015-02-17 05:00:00 UTC"],
                                [103, "2014-11-17 08:00:00 UTC"],
                                [82, "2014-10-21 04:00:00 UTC"],
                                [75, "2014-10-10 04:00:00 UTC"],
                                [72, "2014-10-09 04:00:00 UTC"],
                                [68, "2014-10-07 04:00:00 UTC"],
                                [66, "2014-10-06 04:00:00 UTC"],
                                [62, "2014-10-03 04:00:00 UTC"],
                                [59, "2014-09-10 04:00:00 UTC"],
                                [58, "2014-09-26 04:00:00 UTC"],
                                [41, "2014-08-02 05:00:00 UTC"],
                                [39, "2014-08-25 05:00:00 UTC"],
                                [25, "2014-06-05 10:04:00 UTC"]]

  STAGING_ROLLBACK_VALUES = [[189, "2016-04-27 23:00:00 UTC"],
                             [184, "2016-04-07 05:00:00 UTC"],
                             [183, "2016-03-25 05:00:00 UTC"],
                             [167, "2016-03-04 05:00:00 UTC"],
                             [160, "2015-12-03 05:00:00 UTC"],
                             [159, "2015-10-23 04:00:00 UTC"],
                             [158, "2015-08-31 04:00:00 UTC"],
                             [156, "2015-07-15 04:00:00 UTC"],
                             [144, "2015-06-02 04:00:00 UTC"],
                             [143, "2015-05-29 04:00:00 UTC"],
                             [141, "2014-07-10 04:00:00 UTC"],
                             [129, "2014-11-28 05:00:00 UTC"],
                             [126, "2014-11-19 08:00:00 UTC"],
                             [112, "2014-10-05 04:00:00 UTC"],
                             [111, "2014-10-05 04:00:00 UTC"],
                             [110, "2014-10-28 04:00:00 UTC"],
                             [105, "2014-10-17 04:00:00 UTC"],
                             [103, "2014-10-31 04:00:00 UTC"],
                             [102, "2014-10-07 04:00:00 UTC"],
                             [101, "2014-10-07 04:00:00 UTC"],
                             [93, "2014-10-02 04:00:00 UTC"],
                             [67, "2014-09-22 04:00:00 UTC"],
                             [52, "2014-08-06 04:00:00 UTC"],
                             [48, "2014-08-13 04:00:00 UTC"],
                             [46, "2014-08-11 04:00:00 UTC"],
                             [40, "2014-08-07 04:00:00 UTC"],
                             [25, "2014-06-05 10:04:00 UTC"]]


  def up
    Assessment.where('due_date < assigned_at').each { |assessment|
      assessment.update_column(:due_date, assessment.assigned_at + 30.days)
    }

  end

  def down
    case ENV['ROLLBACK_ENV']
      when 'production'
        batch_update(PRODUCTION_ROLLBACK_VALUES)
      when 'staging'
        batch_update(STAGING_ROLLBACK_VALUES)
      when 'development'
        # no-op
      when 'test'
        # no-op
      else
        raise MigrationError("Unexpected rollback environment #{ENV['ROLLBACK_ENV']}")
    end
  end

  private
  def batch_update(values)
    ActiveRecord::Base.transaction do
      values.each { |id, assigned_at|
        Assessment.where(id: id).update_column(assigned_at: assigned_at)
      }
    end
  end
end
