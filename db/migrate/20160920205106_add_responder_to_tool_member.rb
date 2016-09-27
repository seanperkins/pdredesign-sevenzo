class AddResponderToToolMember < ActiveRecord::Migration
  def change
    add_reference :tool_members, :response
  end
end
