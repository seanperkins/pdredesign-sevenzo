require 'spec_helper'

describe PdrClient::ReportsController, type: :controller do

  let(:consensus_params) do 
    return {
      assessment: { name: "some_name", organized_by: "someone", data: "dontremember" }, 
      consensus:  { id: 1, is_completed: true, assessment_id: 1, participants: [], categories:[], questions: [] } 
    } 
  end

  context "Requiring Consensus pdf" do
    before { 
      create_magic_assessments
      Response.create(responder: @assessment_with_participants)
    }
    let(:assessment) { @assessment_with_participants }

    it "GET#report.pdf" do
      allow(controller).to receive(:render_to_string).and_return("{}")
      post :consensus_report, { assessment_id: assessment.id, format: :pdf }
      expect(response.body).to match("PDF")
      expect(response.headers["Content-Disposition"]).to eq("attachment; filename=\"report.pdf\"")
      expect(response.headers['Content-Type']).to eq('application/pdf')
      assert_response :success
    end
  end

  context "Requiring Concensus csv" do
    before { 
      create_magic_assessments
      Response.create(responder: @assessment_with_participants)
    }
    let(:assessment) { @assessment_with_participants }

    it "GET#report.csv" do
      allow(controller).to receive(:render_to_string).and_return("{}")
      post :consensus_report, { assessment_id: assessment.id, format: :csv }
      expect(response.headers["Content-Disposition"]).to eq("attachment; filename=report.csv")
      expect(response.headers['Content-Type']).to eq('text/csv')
      assert_response :success
    end
  end
end
