class MigrateMessagesToCorrectPolymorphicType < ActiveRecord::Migration
  def change
    Message.update_all(tool_type: 'Assessment')
  end
end
