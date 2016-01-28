class PdrClient::ReportsController < PdrClient::ApplicationController
  helper ApplicationHelper
  include ScoreQuery

  layout false
  before_action :preparing_data
  
  def consensus_report
    respond_to do |format|
      format.pdf { render pdf: :report }
      format.csv { render csv: :report }
    end
  end

  private
  def preparing_data

    template = request.format.pdf? ? 'v1/responses/show.json.jbuilder' : 'v1/report/consensus_report.json.jbuilder'

    consensus_data
    consensus_api_json = JSON.parse(render_to_string(template))
    @consensus  = HashWithIndifferentAccess.new( consensus_api_json )
    @questions  = questions if @consensus[:categories]
  end

  def consensus_data
    @assessment = assessment
    @response   = @assessment.consensus
    @rubric     = @assessment.rubric
    @categories = @response.categories
    @team_role  = params[:team_role]
    @team_roles = @assessment.team_roles_for_participants
  end

  def questions
    questions = []
    @consensus[:categories].each{|category| questions = questions + category[:questions]}
    return questions
  end

  def assessment
    Assessment.find(params[:assessment_id])
  end
end
