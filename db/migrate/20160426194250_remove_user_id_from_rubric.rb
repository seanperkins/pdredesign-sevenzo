class RemoveUserIdFromRubric < ActiveRecord::Migration
  def up
    remove_column :rubrics, :user_id
  end

  def down
    add_column :rubrics, :user_id, :integer
    ids = user_ids
    Rubric.all.order(id: :asc).each_with_index do |rubric, idx|
      rubric.update(user_id: ids[idx])
    end
  end

  private
  def user_ids
    case ENV['ROLLBACK_ENV']
      when 'production'
        [1, 1, nil]
      when 'staging'
        [1, 1, nil]
      when 'development'
        [2, 2, nil]
      else
        raise MigrationError("Unexpected rollback environment #{ENV['ROLLBACK_ENV']}")
    end
  end
end
