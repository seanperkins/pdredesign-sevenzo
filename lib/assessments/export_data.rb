require 'jbuilder'

module Assessments
  class ExportData
    include ApplicationHelper

    attr_reader :owner
    attr_reader :assessments
    def initialize(user, assessments)
      @owner        = user
      @assessments  = assessments
    end

    def in_json!
      view = ActionView::Base.new(ActionController::Base.view_paths, {})
      view.render(
        template: 'export_assessments/assessments.json.jbuilder', 
        locals: {assessments: assessments, owner: owner}
      )
    end
  end
end