require 'action_view/helpers/sanitize_helper'

class MoveToolMessageToEndOfMessagesList < ActiveRecord::Migration
  include ActionView::Helpers::SanitizeHelper
  def up
    [Assessment, Inventory, Analysis].each { |model|
      model.all.each { |tool|
        Message.create!(tool: tool,
                        sent_at: tool.assigned_at,
                        category: 'welcome',
                        content: sanitize(tool.message, tags: []))
      }
    }
  end

  def down
    Message.where(sent_at: Assessment.all.map(&:assigned_at).compact +
                           Inventory.all.map(&:assigned_at).compact +
                           Analysis.all.map(&:assigned_at).compact)
        .delete_all
  end
end
