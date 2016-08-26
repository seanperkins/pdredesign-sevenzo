require 'active_support/concern'
require 'action_view/helpers/sanitize_helper'

module MessageMigrationConcern
  extend ActiveSupport::Concern
  include ActionView::Helpers::SanitizeHelper

  included do
    after_save :add_initial_message
  end

  def add_initial_message
    return if Message.exists?(tool: self)
    Message.create!(tool: self,
                    sent_at: self.assigned_at,
                    content: sanitize(self.message, tags: []))
  end
end