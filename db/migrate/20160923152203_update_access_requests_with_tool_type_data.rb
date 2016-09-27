class UpdateAccessRequestsWithToolTypeData < ActiveRecord::Migration
  def change
    AccessRequest.update_all(tool_type: Assessment.to_s)
  end
end
